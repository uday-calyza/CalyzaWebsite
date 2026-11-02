import os
from typing import Dict, Any
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import BedrockEmbeddings
from langchain_community.vectorstores import FAISS

# Use a relative path that works on any OS
PERSIST_DIRECTORY = os.path.join(os.path.dirname(os.path.abspath(__file__)), "faiss_index_new")

# Cache the vectorstore to avoid reloading on every query
_vectorstore = None


def _get_vectorstore():
    global _vectorstore
    if _vectorstore is None:
        embedding_model = BedrockEmbeddings(
            model_id="amazon.titan-embed-text-v2:0",
            region_name="us-east-1"
        )
        _vectorstore = FAISS.load_local(
            folder_path=PERSIST_DIRECTORY,
            embeddings=embedding_model,
            allow_dangerous_deserialization=True
        )
    return _vectorstore


def retrieve_context(user_query):
    """Retrieve top matching context from KB"""
    try:
        vectorstore = _get_vectorstore()

        if vectorstore.index.ntotal == 0:
            return "Knowledge base is empty."

        # Get top 2 results and combine them
        results = vectorstore.similarity_search(user_query, k=2)

        if not results:
            return "No relevant information found."

        combined = "\n\n".join([r.page_content for r in results])
        return combined

    except Exception as e:
        print(f"KB retrieval error: {e}")
        return f"Error retrieving context: {str(e)}"


def website_knowledge_retrieval(query: str) -> Dict[str, Any]:
    """Wrapper function used by Nova Sonic tool calls"""
    try:
        contexts = retrieve_context(query)
        return {
            "status": "success",
            "query": query,
            "contexts": contexts
        }
    except Exception as e:
        return {
            "status": "error",
            "query": query,
            "error": str(e)
        }


if __name__ == "__main__":
    test_query = "What services does CalyzaTech offer?"
    result = website_knowledge_retrieval(test_query)
    print("Test Query:", test_query)
    print("Result:", result)
