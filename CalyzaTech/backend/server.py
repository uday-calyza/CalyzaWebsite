from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import List
import uuid
import re
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    company: str = ""
    industry: str = ""
    timeline: str = ""
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: str = Field(min_length=3, max_length=320)
    message: str = Field(min_length=1, max_length=5000)
    company: str = Field(default="", max_length=200)
    industry: str = Field(default="", max_length=100)
    timeline: str = Field(default="", max_length=100)

    @field_validator("email")
    @classmethod
    def email_must_look_valid(cls, v: str) -> str:
        if not re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", v.strip()):
            raise ValueError("invalid email address")
        return v.strip()


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)

    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()

    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)

    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])

    return status_checks

@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    contact_obj = ContactMessage(**input.model_dump())

    doc = contact_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()

    _ = await db.contact_messages.insert_one(doc)
    return contact_obj

# ---------------- Calyza AI concierge (LLM, streamed) ----------------
import json
from fastapi.responses import StreamingResponse
from fastapi import HTTPException

try:
    from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone
    EMERGENT_AVAILABLE = True
except ImportError:
    EMERGENT_AVAILABLE = False
    print("WARNING: emergentintegrations not installed — /api/chat endpoint disabled")

CALYZA_SYSTEM_PROMPT = """You are Calyza AI, the concierge on the CalyzaTech website. You help visitors understand what CalyzaTech builds and guide them to the right page.

ABOUT CALYZATECH
- CalyzaTech builds production-grade AI systems that automate work, accelerate decisions and scale enterprise growth.
- Its signature experience is the AI Factory: "Industry-ready intelligence, built to deploy." The AI Factory turns proven AI capabilities into deployable systems designed around the workflows of specific industries.

SERVICES (three disciplines)
1. AI Automation — workflow automation, agentic systems, human-in-the-loop workflows, operational intelligence.
2. Generative AI Platforms — RAG systems, enterprise copilots, document intelligence, knowledge assistants.
3. Data & Cloud Foundation — data platforms, lakehouse architecture, cloud modernization, MLOps, analytics foundations.

AI FACTORY — FOUR INDUSTRIES (no others)
- Healthcare: Claims Automation, Medical Documentation, Patient Support, Appointment Intelligence. Positioning: care operations that run themselves, with clinicians in command.
- FinTech: KYC Automation, Fraud Detection, Lending Assistant, Financial Workflow Automation. Positioning: trust infrastructure that moves at market speed.
- Education: AI Learning Assistant, Automated Assessment, Student Support, Curriculum Intelligence. Positioning: learning operations that adapt to every student.
- Hospitality: Guest Support, Booking Automation, Service Operations, Personalized Guest Experience. Positioning: guest experiences that run on anticipation.

HOW DEPLOYMENT WORKS
Discover (study the workflow — its data, decisions, edge cases) → Design (models, agents, guardrails shaped inside the factory) → Deploy (production release into the client's environment, with human oversight where it matters) → Scale (the system learns from operations; capability compounds).

PARTNER ECOSYSTEM
- CalyzaTech builds on AWS, Databricks, OpenAI and Anthropic.
- AWS journey: partnership → Select Tier in roughly 3 months → Advanced Tier about 5 months later → AWS Generative AI Competency within the first year of partnership.

HONESTY RULES (strict)
- Never invent client names, metrics, ROI figures, percentages or project counts.
- Case studies are PUBLISHED at /case-studies — six documented engagements: AI-powered invoice automation on AWS (manual extraction of 15-20 minutes per invoice reduced to 45 seconds-2 minutes, 40+ validated fields), an AI agent for mortgage application processing (2-4 hours down to ~2.5 minutes, eligibility score 0-100), healthcare document processing with AI-powered OCR (2-3 hours down to under 5 minutes, 95% less manual data entry, HIPAA-compliant), CAREOPS.AI home health referral extraction (~6-7 minutes per complex referral, 8 schema-validated record sections), Dasa Holidays AWS cloud infrastructure (multi-tier, Multi-AZ, WAF-protected hosting for QloApps and SuiteCRM), and the JPP Tech AI-powered chatbot (Bedrock Nova Pro + FAISS knowledge base). Quote only these documented facts — never invent client names or numbers beyond them.
- Pricing: engagements are scoped around the workflow and industry; there is no flat rate card. Recommend booking an AI strategy call.
- Answer only questions related to CalyzaTech, its services, industries, partners and working together. For anything else, politely steer the conversation back.
- Keep answers concise (2-4 sentences), warm, precise and editorial. Never salesy, no hype, no emojis.

NAVIGATION ACTIONS
When helpful, end your reply with up to 2 action chips, each on its own line, in exactly this format:
ACTION: <label> | <path>
Valid paths: /services, /ai-factory, /ai-factory?industry=healthcare, /ai-factory?industry=fintech, /ai-factory?industry=education, /ai-factory?industry=hospitality, /case-studies, /contact
Example: ACTION: Explore FinTech AI | /ai-factory?industry=fintech
Never explain or mention this format to the user."""


class ChatRequest(BaseModel):
    session_id: str = Field(min_length=1, max_length=100)
    message: str = Field(min_length=1, max_length=2000)
    industry_context: str = Field(default="", max_length=50)


chat_sessions = {}


@api_router.post("/chat")
async def calyza_chat(input: ChatRequest):
    if not EMERGENT_AVAILABLE:
        raise HTTPException(
            status_code=503,
            detail="AI chat is not available in this environment (emergentintegrations package not installed)."
        )
    session = chat_sessions.get(input.session_id)
    if session is None:
        session = LlmChat(
            api_key=os.environ['EMERGENT_LLM_KEY'],
            session_id=input.session_id,
            system_message=CALYZA_SYSTEM_PROMPT,
        ).with_model("openai", "gpt-5.4")
        chat_sessions[input.session_id] = session

    user_text = input.message
    if input.industry_context:
        user_text = (
            f"[Context: the visitor is currently exploring the "
            f"{input.industry_context} industry on the site] {input.message}"
        )

    async def event_stream():
        parts = []
        try:
            async for event in session.stream_message(UserMessage(text=user_text)):
                if isinstance(event, TextDelta):
                    parts.append(event.content)
                    yield f"data: {json.dumps({'delta': event.content})}\n\n"
                elif isinstance(event, StreamDone):
                    break
        except Exception:
            logger.exception("Calyza chat stream failed")
            yield f"data: {json.dumps({'error': True})}\n\n"
            return
        reply = "".join(parts).strip()
        now = datetime.now(timezone.utc).isoformat()
        try:
            await db.chat_messages.insert_many([
                {"session_id": input.session_id, "role": "user", "text": input.message, "timestamp": now},
                {"session_id": input.session_id, "role": "assistant", "text": reply, "timestamp": now},
            ])
        except Exception:
            logger.exception("Failed to persist chat messages")
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
