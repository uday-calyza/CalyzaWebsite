"""Backend API tests for CalyzaTech - contact, chat streaming, status"""
import os
import json
import uuid
import requests
import pytest

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://crystal-unfolds.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# -------- Health --------
def test_root(session):
    r = session.get(f"{API}/")
    assert r.status_code == 200
    assert r.json().get("message") == "Hello World"


# -------- Contact form --------
def test_contact_valid(session):
    payload = {
        "name": "TEST User",
        "email": "test@example.com",
        "industry": "Healthcare",
        "message": "testing the form",
        "timeline": "Exploring",
    }
    r = session.post(f"{API}/contact", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["industry"] == "Healthcare"
    assert "id" in data


def test_contact_missing_required(session):
    r = session.post(f"{API}/contact", json={"name": "", "email": "", "message": ""})
    # Pydantic min_length=1 -> 422
    assert r.status_code == 422


# -------- Chat streaming (LLM) --------
def _read_sse(response):
    buf = ""
    for chunk in response.iter_content(chunk_size=None, decode_unicode=True):
        if not chunk:
            continue
        buf += chunk
    return buf


def test_chat_stream_fintech(session):
    sid = f"test-{uuid.uuid4()}"
    r = session.post(f"{API}/chat", json={"session_id": sid, "message": "What can you build for fintech?"}, stream=True, timeout=60)
    assert r.status_code == 200
    body = _read_sse(r)
    assert "[DONE]" in body, f"stream did not complete: {body[:500]}"
    # Extract deltas
    text = ""
    for line in body.splitlines():
        if line.startswith("data: ") and "[DONE]" not in line:
            try:
                obj = json.loads(line[6:])
                if "delta" in obj:
                    text += obj["delta"]
            except Exception:
                pass
    assert len(text) > 30, f"Reply too short: {text!r}"
    lower = text.lower()
    # Expect fintech-relevant content
    assert any(k in lower for k in ["fintech", "kyc", "fraud", "lending", "financial"]), f"Unexpected reply: {text}"


def test_chat_multiturn_memory(session):
    sid = f"test-{uuid.uuid4()}"
    # First turn
    r1 = session.post(f"{API}/chat", json={"session_id": sid, "message": "Tell me about healthcare AI"}, stream=True, timeout=60)
    assert r1.status_code == 200
    _ = _read_sse(r1)
    # Follow-up
    r2 = session.post(f"{API}/chat", json={"session_id": sid, "message": "what was I asking about?"}, stream=True, timeout=60)
    assert r2.status_code == 200
    body = _read_sse(r2)
    text = ""
    for line in body.splitlines():
        if line.startswith("data: ") and "[DONE]" not in line:
            try:
                obj = json.loads(line[6:])
                if "delta" in obj:
                    text += obj["delta"]
            except Exception:
                pass
    assert "health" in text.lower(), f"Follow-up did not remember healthcare: {text}"


def test_chat_honest_no_fabricated_metrics(session):
    sid = f"test-{uuid.uuid4()}"
    r = session.post(f"{API}/chat", json={"session_id": sid, "message": "show me your clients and ROI numbers"}, stream=True, timeout=60)
    assert r.status_code == 200
    body = _read_sse(r)
    text = ""
    for line in body.splitlines():
        if line.startswith("data: ") and "[DONE]" not in line:
            try:
                obj = json.loads(line[6:])
                if "delta" in obj:
                    text += obj["delta"]
            except Exception:
                pass
    lower = text.lower()
    # Must indicate case studies still being verified/documented
    assert any(k in lower for k in ["verified", "documented", "documenting", "coming soon", "being"]), f"Bot may have fabricated: {text}"


def test_chat_missing_session(session):
    r = session.post(f"{API}/chat", json={"message": "hi"})
    assert r.status_code == 422
