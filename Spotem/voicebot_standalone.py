"""
Standalone Voice Bot Server
Runs on its own port (8001) to avoid awscrt/uvicorn event loop conflicts.
Uses asyncio.run() directly which is proven to work with the Bedrock SDK.
"""
import asyncio
import json
import uuid
import os
import warnings
import base64
from dotenv import load_dotenv

load_dotenv()
warnings.filterwarnings("ignore")

if not os.environ.get('AWS_DEFAULT_REGION'):
    os.environ['AWS_DEFAULT_REGION'] = "us-east-1"

import websockets
from aws_sdk_bedrock_runtime.client import BedrockRuntimeClient, InvokeModelWithBidirectionalStreamOperationInput
from aws_sdk_bedrock_runtime.models import InvokeModelWithBidirectionalStreamInputChunk, BidirectionalInputPayloadPart
from aws_sdk_bedrock_runtime.config import Config
from smithy_aws_core.identity.environment import EnvironmentCredentialsResolver
from nova_sonic_kb import website_knowledge_retrieval

INPUT_SAMPLE_RATE = 16000
OUTPUT_SAMPLE_RATE = 24000


async def handle_voice_session(websocket):
    """Handle a single voice bot WebSocket session"""
    prompt_name = str(uuid.uuid4())
    content_name = str(uuid.uuid4())
    audio_content_name = str(uuid.uuid4())

    print(f"🟢 New voice connection from {websocket.remote_address}")

    # Initialize Bedrock
    creds = EnvironmentCredentialsResolver()
    config = Config(
        endpoint_uri="https://bedrock-runtime.us-east-1.amazonaws.com",
        region="us-east-1",
        aws_credentials_identity_resolver=creds
    )
    client = BedrockRuntimeClient(config=config)

    try:
        stream = await client.invoke_model_with_bidirectional_stream(
            InvokeModelWithBidirectionalStreamOperationInput(model_id="amazon.nova-sonic-v1:0")
        )
    except Exception as e:
        print(f"❌ Failed to create stream: {e}")
        await websocket.send(json.dumps({"type": "error", "message": str(e)}))
        return

    print(f"✅ Voice session started: {prompt_name[:8]}...")
    is_active = True

    # System prompt
    system_prompt = (
        "You are Calyza AI, a friendly voice assistant for CalyzaTech (pronounced Ka-LEE-za Tech). "
        "The user may pronounce the company name in various ways such as: "
        "CalyzaTech, Calyza Tech, Khel Jaa, Khaleeza, Kalyza, Calisa, Kelisa, Calisatech, or similar. "
        "Always assume these variations refer to CalyzaTech and use the knowledge base tool to answer. "
        "CalyzaTech specializes in AI solutions, cloud infrastructure, data analytics, and custom software development. "
        "Keep responses concise and conversational since this is voice. "
        "Limit responses to 2-3 sentences."
    )

    # KB tool schema
    kb_schema = json.dumps({"type": "object", "properties": {"query": {"type": "string", "description": "The user question about CalyzaTech"}}, "required": ["query"]})

    # Send init events
    init_events = [
        {"event": {"sessionStart": {"inferenceConfiguration": {"maxTokens": 1024, "topP": 0.9, "temperature": 0.7}}}},
        {"event": {"promptStart": {"promptName": prompt_name, "textOutputConfiguration": {"mediaType": "text/plain"}, "audioOutputConfiguration": {"mediaType": "audio/lpcm", "sampleRateHertz": OUTPUT_SAMPLE_RATE, "sampleSizeBits": 16, "channelCount": 1, "voiceId": "matthew", "encoding": "base64", "audioType": "SPEECH"}, "toolUseOutputConfiguration": {"mediaType": "application/json"}, "toolConfiguration": {"toolChoice": {"auto": {}}, "tools": [{"toolSpec": {"name": "retrieve_calyzatech_website", "description": "Retrieves CalyzaTech company info, services, and case studies.", "inputSchema": {"json": kb_schema}}}]}}}},
        {"event": {"contentStart": {"promptName": prompt_name, "contentName": content_name, "type": "TEXT", "role": "SYSTEM", "interactive": True, "textInputConfiguration": {"mediaType": "text/plain"}}}},
        {"event": {"textInput": {"promptName": prompt_name, "contentName": content_name, "content": system_prompt}}},
        {"event": {"contentEnd": {"promptName": prompt_name, "contentName": content_name}}},
        {"event": {"contentStart": {"promptName": prompt_name, "contentName": audio_content_name, "type": "AUDIO", "interactive": True, "role": "USER", "audioInputConfiguration": {"mediaType": "audio/lpcm", "sampleRateHertz": INPUT_SAMPLE_RATE, "sampleSizeBits": 16, "channelCount": 1, "audioType": "SPEECH", "encoding": "base64"}}}},
    ]

    for evt in init_events:
        event = InvokeModelWithBidirectionalStreamInputChunk(
            value=BidirectionalInputPayloadPart(bytes_=json.dumps(evt).encode('utf-8'))
        )
        await stream.input_stream.send(event)
        await asyncio.sleep(0.05)

    # Tell browser we're ready
    await websocket.send(json.dumps({"type": "ready"}))

    async def send_audio_to_bedrock():
        """Receive audio from browser and send to Bedrock"""
        nonlocal is_active
        try:
            async for message in websocket:
                if not is_active:
                    break
                try:
                    data = json.loads(message)
                    if data.get("type") == "audio":
                        audio_event = json.dumps({
                            "event": {
                                "audioInput": {
                                    "promptName": prompt_name,
                                    "contentName": audio_content_name,
                                    "content": data["data"]
                                }
                            }
                        })
                        event = InvokeModelWithBidirectionalStreamInputChunk(
                            value=BidirectionalInputPayloadPart(bytes_=audio_event.encode('utf-8'))
                        )
                        await stream.input_stream.send(event)
                    elif data.get("type") == "stop":
                        is_active = False
                        break
                except json.JSONDecodeError:
                    continue
        except websockets.ConnectionClosed:
            is_active = False

    async def receive_from_bedrock():
        """Receive responses from Bedrock and send to browser"""
        nonlocal is_active
        tool_use_content = ""
        tool_use_id = ""
        tool_name = ""
        role = ""

        while is_active:
            try:
                output = await stream.await_output()
                result = await output[1].receive()

                if result.value and result.value.bytes_:
                    try:
                        data = json.loads(result.value.bytes_.decode('utf-8'))
                    except:
                        continue

                    if 'event' not in data:
                        continue

                    evt = data['event']

                    if 'contentStart' in evt:
                        role = evt['contentStart'].get('role', '')

                    elif 'audioOutput' in evt:
                        await websocket.send(json.dumps({
                            "type": "audio",
                            "data": evt['audioOutput']['content']
                        }))

                    elif 'textOutput' in evt:
                        text = evt['textOutput']['content']
                        if '{ "interrupted" : true }' in text:
                            await websocket.send(json.dumps({"type": "interrupted"}))
                        elif role == 'USER':
                            await websocket.send(json.dumps({"type": "transcript", "role": "user", "text": text}))
                        else:
                            await websocket.send(json.dumps({"type": "transcript", "role": "assistant", "text": text}))

                    elif 'toolUse' in evt:
                        tool_use_content = evt['toolUse']
                        tool_name = evt['toolUse']['toolName']
                        tool_use_id = evt['toolUse']['toolUseId']

                    elif 'contentEnd' in evt and evt.get('contentEnd', {}).get('type') == 'TOOL':
                        # Process KB tool
                        tool_result = {}
                        try:
                            content_dict = json.loads(tool_use_content['content'])
                            query = content_dict.get('query', '')
                            print(f"🔍 Voice KB query: {query}")
                            if query:
                                tool_result = website_knowledge_retrieval(query)
                        except Exception as e:
                            tool_result = {"status": "error", "error": str(e)}

                        tc_name = str(uuid.uuid4())
                        tool_events = [
                            {"event": {"contentStart": {"promptName": prompt_name, "contentName": tc_name, "interactive": False, "type": "TOOL", "role": "TOOL", "toolResultInputConfiguration": {"toolUseId": tool_use_id, "type": "TEXT", "textInputConfiguration": {"mediaType": "text/plain"}}}}},
                            {"event": {"toolResult": {"promptName": prompt_name, "contentName": tc_name, "content": json.dumps(tool_result)}}},
                            {"event": {"contentEnd": {"promptName": prompt_name, "contentName": tc_name}}},
                        ]
                        for te in tool_events:
                            ev = InvokeModelWithBidirectionalStreamInputChunk(
                                value=BidirectionalInputPayloadPart(bytes_=json.dumps(te).encode('utf-8'))
                            )
                            await stream.input_stream.send(ev)

                    elif 'completionEnd' in evt:
                        await websocket.send(json.dumps({"type": "done"}))

            except StopAsyncIteration:
                break
            except websockets.ConnectionClosed:
                break
            except Exception as e:
                if "InvalidStateError" in str(e) or "CANCELLED" in str(e):
                    continue
                print(f"Receive error: {e}")
                break

        is_active = False

    # Run both tasks
    try:
        await asyncio.gather(send_audio_to_bedrock(), receive_from_bedrock())
    except Exception as e:
        print(f"Session error: {e}")

    # Cleanup
    try:
        end_events = [
            {"event": {"contentEnd": {"promptName": prompt_name, "contentName": audio_content_name}}},
            {"event": {"promptEnd": {"promptName": prompt_name}}},
            {"event": {"sessionEnd": {}}},
        ]
        for te in end_events:
            ev = InvokeModelWithBidirectionalStreamInputChunk(
                value=BidirectionalInputPayloadPart(bytes_=json.dumps(te).encode('utf-8'))
            )
            await stream.input_stream.send(ev)
        await stream.input_stream.close()
    except:
        pass

    print(f"🔴 Voice session closed: {prompt_name[:8]}...")


async def main():
    """Start the WebSocket server"""
    print("🎙️  Voice Bot Server starting on ws://0.0.0.0:8001")
    async with websockets.serve(handle_voice_session, "0.0.0.0", 8001):
        print("✅ Voice Bot Server running on port 8001")
        await asyncio.Future()  # Run forever


if __name__ == "__main__":
    asyncio.run(main())
