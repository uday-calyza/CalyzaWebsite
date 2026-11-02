from fastapi import FastAPI, Request, WebSocket
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from langchain_community.vectorstores import FAISS
from langchain_aws import BedrockEmbeddings, ChatBedrock
from textblob import TextBlob
import os
import traceback
import warnings
import asyncio
from functools import partial, lru_cache
from collections import OrderedDict
import time
from dotenv import load_dotenv

# Load .env file for local development
load_dotenv()

warnings.filterwarnings("ignore", category=DeprecationWarning)

# AWS credentials — use environment variables or IAM role on EC2
# Do NOT hardcode keys in source code
# On EC2: attach an IAM role with Bedrock access (no keys needed)
# Locally: set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY as env vars
if not os.environ.get('AWS_DEFAULT_REGION'):
    os.environ['AWS_DEFAULT_REGION'] = "us-east-1"

app = FastAPI()

# Add CORS middleware
from fastapi.middleware.cors import CORSMiddleware

# Restrict to your domains in production
ALLOWED_ORIGINS = os.environ.get("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

# Add cache headers for static files
from starlette.middleware.base import BaseHTTPMiddleware

class CacheControlMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        if request.url.path.startswith("/static/"):
            # Cache static files for 1 hour
            response.headers["Cache-Control"] = "public, max-age=3600"
        return response

app.add_middleware(CacheControlMiddleware)

# Mount static folder
app.mount("/static", StaticFiles(directory="static"), name="static")


# -----------------------
# Simple Response Cache (TTL: 10 minutes, max 200 entries)
# Reduces LLM calls for repeated questions
# -----------------------
class ResponseCache:
    def __init__(self, max_size=200, ttl_seconds=600):
        self.cache = OrderedDict()
        self.max_size = max_size
        self.ttl = ttl_seconds

    def get(self, key):
        key = key.lower().strip()
        if key in self.cache:
            entry = self.cache[key]
            if time.time() - entry["time"] < self.ttl:
                self.cache.move_to_end(key)
                return entry["reply"]
            else:
                del self.cache[key]
        return None

    def set(self, key, reply):
        key = key.lower().strip()
        if len(self.cache) >= self.max_size:
            self.cache.popitem(last=False)
        self.cache[key] = {"reply": reply, "time": time.time()}

response_cache = ResponseCache()


# -----------------------
# Rate Limiter (per IP: 20 requests per minute)
# -----------------------
class RateLimiter:
    def __init__(self, max_requests=20, window_seconds=60):
        self.requests = {}
        self.max_requests = max_requests
        self.window = window_seconds

    def is_allowed(self, client_ip: str) -> bool:
        now = time.time()
        if client_ip not in self.requests:
            self.requests[client_ip] = []

        # Remove old entries
        self.requests[client_ip] = [
            t for t in self.requests[client_ip] if now - t < self.window
        ]

        if len(self.requests[client_ip]) >= self.max_requests:
            return False

        self.requests[client_ip].append(now)
        return True

rate_limiter = RateLimiter()


# -----------------------
# Helper functions
# -----------------------

def clean_kb_context(text: str) -> str:
    """
    Remove boilerplate KB sections from text
    """
    boilerplate_markers = [
        "Important Links", "Let’s Connect", "Copyright"
    ]
    for marker in boilerplate_markers:
        index = text.find(marker)
        if index != -1:
            text = text[:index]
    return text.strip()


def get_relevant_kb_docs(retriever, query: str, top_k: int = 2):
    """
    Retrieve the top_k most relevant KB documents for the given query.
    Cleans boilerplate content from each document.
    Compatible with both old and new LangChain versions.
    """
    try:
        # For older versions of LangChain
        docs = retriever.get_relevant_documents(query)
    except AttributeError:
        # For newer LangChain (>= 0.1.0)
        docs = retriever.invoke(query)

    if not docs:
        return []

    cleaned_docs = [
        clean_kb_context(doc.page_content) for doc in docs[:top_k]
    ]
    return cleaned_docs




def truncate_response(text: str, max_words: int = 100) -> str:
    """
    Truncate response to keep it concise while maintaining meaning
    """
    words = text.split()
    if len(words) <= max_words:
        return text
    
    # Find a good breaking point (end of sentence)
    truncated = " ".join(words[:max_words])
    
    # Try to end at a sentence boundary
    last_period = truncated.rfind('.')
    last_exclamation = truncated.rfind('!')
    last_question = truncated.rfind('?')
    
    best_end = max(last_period, last_exclamation, last_question)
    
    if best_end > len(truncated) * 0.7:  # If we can keep at least 70% of content
        return truncated[:best_end + 1]
    else:
        return truncated + "..."


def is_closing_statement(text: str) -> bool:
    """
    Detect if the user message is a closing statement
    using word-boundary keyword check + sentiment analysis.
    """
    closings_keywords = [
        "thanks", "thank you", "thx", "thats all",
        "okay", "bye", "goodbye", "see you", "take care",
        "no thanks", "nothing", "all good", "done", "perfect"
    ]

    lowered = text.lower().strip()
    words = lowered.split()

    # Only trigger for short messages (likely closings, not questions)
    if len(words) > 6:
        return False

    for keyword in closings_keywords:
        if " " in keyword:
            if keyword in lowered:
                return True
        else:
            if keyword in words:
                return True

    # Very short positive messages
    if len(words) <= 3:
        blob = TextBlob(text)
        if blob.sentiment.polarity > 0.5:
            return True

    return False


# -----------------------
# Load FAISS + LLM
# -----------------------

try:
    embedding_model = BedrockEmbeddings(
        model_id="amazon.titan-embed-text-v2:0",
        region_name="us-east-1"
    )
    vectorstore = FAISS.load_local(
        "faiss_index_new",
        embedding_model,
        allow_dangerous_deserialization=True
    )
    print("✅ FAISS index loaded successfully.")
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
    print("✅ Retriever initialized.")
except Exception as e:
    print("❌ Error loading FAISS or embeddings:", e)
    vectorstore = None
    retriever = None

try:
    llm = ChatBedrock(
        model_id="amazon.nova-pro-v1:0",
        region_name="us-east-1",
        model_kwargs={
            "max_tokens": 150,  # Limit response length
            "temperature": 0.3,  # Lower temperature for more focused responses
            "top_p": 0.8
        }
    )
    print("✅ Bedrock LLM initialized successfully.")
except Exception as e:
    print("❌ Error initializing Bedrock LLM:", e)
    llm = None


# -----------------------
# Routes
# -----------------------

@app.get("/", response_class=HTMLResponse)
async def get_home():
    with open("static/chatbbot.html", "r", encoding="utf-8") as f:
        return f.read()


@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "ok",
        "vectorstore": vectorstore is not None,
        "llm": llm is not None,
        "cache_size": len(response_cache.cache)
    }


@app.get("/chatpage", response_class=HTMLResponse)
async def get_chatpage():
    with open("static/chat.html", "r", encoding="utf-8") as f:
        content = f.read()
    # Allow this page to be embedded in iframes on any origin
    return HTMLResponse(
        content=content,
        headers={"X-Frame-Options": "ALLOWALL", "Content-Security-Policy": "frame-ancestors *"}
    )


@app.get("/demo", response_class=HTMLResponse)
async def get_demo():
    """Fake client website to test chatbot integration"""
    with open("static/fake-client-website.html", "r", encoding="utf-8") as f:
        return f.read()


@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    user_message = data.get("message", "").strip()

    # Input validation
    if not user_message:
        return {"reply": "Please enter a message."}
    if len(user_message) > 1000:
        return {"reply": "Please keep your message under 1000 characters."}

    # Rate limiting
    client_ip = request.client.host
    if not rate_limiter.is_allowed(client_ip):
        return JSONResponse(
            status_code=429,
            content={"reply": "You're sending messages too fast. Please wait a moment."}
        )

    try:
        # Check for greetings - must be at the start or be standalone words
        greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"]
        user_lower = user_message.lower().strip()
        
        # Check if message starts with greeting or is just a greeting
        is_greeting = False
        for greeting in greetings:
            if (user_lower.startswith(greeting + " ") or 
                user_lower == greeting or
                user_lower.startswith(greeting + ",") or
                user_lower.startswith(greeting + "!")):
                is_greeting = True
                break
        
        if is_greeting:
            return {"reply": "👋 Hi there! I'm CalyzaBOT. How can I help you today?"}

        # Now check closings only if it's not a greeting
        if is_closing_statement(user_message):
            return {"reply": "You're welcome! 😊 Glad I could help."}

        if not vectorstore or not retriever:
            return {"reply": "❌ Vectorstore not loaded. Please check FAISS index."}
        if not llm:
            return {"reply": "❌ LLM not initialized. Please check Bedrock setup."}

        # Check cache first — instant response for repeated questions
        cached_reply = response_cache.get(user_message)
        if cached_reply:
            print(f"⚡ Cache hit for: {user_message[:50]}")
            return {"reply": cached_reply}

        # First, try to find relevant information in the knowledge base
        relevant_docs = get_relevant_kb_docs(retriever, user_message, top_k=2)

        if relevant_docs:
            # KB HAS relevant information - use it
            context = "\n\n".join(relevant_docs)
            
            prompt = f"""You are CalyzaBOT, a helpful assistant for CalyzaTech company.

User Question: {user_message}

CalyzaTech Context Information:
{context}

Instructions:
- Answer based on the CalyzaTech context provided
- Keep your response between 2-4 sentences (50-100 words maximum)
- Be direct and to the point
- Use a friendly, professional tone

Answer:"""

            print(f"🔍 Invoking LLM with prompt: {prompt[:100]}...")
            loop = asyncio.get_event_loop()
            response = await loop.run_in_executor(None, llm.invoke, prompt)
            print(f"🔍 LLM response type: {type(response)}")
            print(f"🔍 LLM response: {response}")
            reply_text = response.content if hasattr(response, "content") else str(response)
            
            # Clean up and truncate response
            cleaned_reply = clean_kb_context(reply_text)
            final_reply = truncate_response(cleaned_reply, max_words=80)
            
            # Cache the response
            response_cache.set(user_message, final_reply)
            return {"reply": final_reply}
        
        else:
            # KB has NO relevant information - use Nova Pro's general knowledge
            general_prompt = f"""You are CalyzaBOT, a helpful AI assistant.

User Question: {user_message}

Instructions:
- Provide a helpful, accurate answer using your general knowledge
- Keep your response between 2-4 sentences (50-100 words maximum)
- Be direct and to the point
- Use a friendly, professional tone
- If you don't know something, say so honestly

Answer:"""

            print(f"🔍 Invoking LLM with general prompt: {general_prompt[:100]}...")
            loop = asyncio.get_event_loop()
            response = await loop.run_in_executor(None, llm.invoke, general_prompt)
            print(f"🔍 LLM response type: {type(response)}")
            print(f"🔍 LLM response: {response}")
            reply_text = response.content if hasattr(response, "content") else str(response)
            
            # Truncate response for general knowledge too
            final_reply = truncate_response(reply_text, max_words=80)
            
            # Cache the response
            response_cache.set(user_message, final_reply)
            return {"reply": final_reply}

    except Exception as e:
        print("❌ Error in /chat:", e)
        traceback.print_exc()
        return JSONResponse(
            status_code=500,
            content={"reply": "⚠️ Internal server error. Check backend logs."}
        )


# -----------------------
# Voice Bot Routes
# -----------------------

@app.get("/voicepage", response_class=HTMLResponse)
async def get_voicepage():
    """Voice bot page (loaded in iframe)"""
    with open("static/voicebot.html", "r", encoding="utf-8") as f:
        content = f.read()
    return HTMLResponse(
        content=content,
        headers={"X-Frame-Options": "ALLOWALL", "Content-Security-Policy": "frame-ancestors *"}
    )


@app.get("/unified", response_class=HTMLResponse)
async def get_unified_widget():
    """Unified widget with both chat and voice"""
    with open("static/unified-widget.html", "r", encoding="utf-8") as f:
        content = f.read()
    return HTMLResponse(
        content=content,
        headers={"X-Frame-Options": "ALLOWALL", "Content-Security-Policy": "frame-ancestors *"}
    )


@app.websocket("/ws/voice")
async def websocket_voice(websocket: WebSocket):
    """WebSocket endpoint for voice bot"""
    from voicebot_server import voicebot_websocket_handler
    await voicebot_websocket_handler(websocket)
