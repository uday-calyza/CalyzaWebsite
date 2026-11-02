#!/usr/bin/env python3
"""
Test script to verify the chat fixes work correctly
"""
import requests
import json

def test_chat_message(message):
    """Test a chat message and return the response"""
    try:
        response = requests.post(
            "http://localhost:8000/chat",
            json={"message": message},
            headers={"Content-Type": "application/json"}
        )
        if response.status_code == 200:
            return response.json()["reply"]
        else:
            return f"Error: {response.status_code}"
    except Exception as e:
        return f"Connection error: {e}"

def run_tests():
    """Run test cases"""
    test_cases = [
        ("Hi", "Should be greeting"),
        ("What services does JPP offer?", "Should use KB (JPP info)"),
        ("Tell me about JPP Tech", "Should use KB (JPP info)"),
        ("What is football?", "Should use Nova Pro general knowledge"),
        ("Who is the King of England?", "Should use Nova Pro general knowledge"),
        ("What is cricket?", "Should use Nova Pro general knowledge"),
        ("JPP cybersecurity solutions", "Should use KB (JPP info)"),
        ("thanks", "Should be closing"),
    ]
    
    print("🧪 Testing Chat Fixes...")
    print("=" * 50)
    
    for message, expected in test_cases:
        print(f"\n📝 Test: '{message}'")
        print(f"Expected: {expected}")
        response = test_chat_message(message)
        print(f"Response: {response}")
        print("-" * 30)

if __name__ == "__main__":
    run_tests()