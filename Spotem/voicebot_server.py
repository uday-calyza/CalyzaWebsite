"""
Voice Bot WebSocket Server
Bridges browser audio ↔ Amazon Nova Sonic via WebSocket
Uses a separate thread for Bedrock streaming to avoid awscrt/uvicorn event loop conflicts
"""
import asyncio
import base64
import json
import uuid
import os
import warnings
import threading
import queue
from fastapi import WebSocket, WebSocketDisconnect
from dotenv import load_dotenv

load_dotenv()
warnings.filterwarnings("ignore")

if not os.environ.get('AWS_DEFAULT_REGION'):
    os.environ['AWS_DEFAULT_REGION'] = "us-east-1"

# Import Bedrock SDK
try:
    from aws_sdk_bedrock_runtime.client import AsyncBedrockRuntimeClient as BedrockRuntimeClient
    from aws_sdk_bedrock_runtime.client import InvokeModelWithBidirectionalStreamOperationInput
except ImportError:
    from aws_sdk_bedrock_runtime.client import BedrockRuntimeClient, InvokeModelWithBidirectionalStreamOperationInput
from aws_sdk_bedrock_runtime.models import InvokeModelWithBidirectionalStreamInputChunk, BidirectionalInputPayloadPart
from aws_sdk_bedrock_runtime.config import Config
from smithy_aws_core.identity.environment import EnvironmentCredentialsResolver

# Import knowledge base
from nova_sonic_kb import website_knowledge_retrieval

# Audio configuration
INPUT_SAMPLE_RATE = 16000
OUTPUT_SAMPLE_RATE = 24000


class WebVoiceBotSession:
    """
    Manages a voice bot session. 
    Runs Bedrock streaming in a SEPARATE thread with its own event loop
    to avoid awscrt conflicts with uvicorn's event loop.
    """

    def __init__(self, websocket: WebSocket):
        self.websocket = websocket
        self.model_id = "amazon.nova-sonic-v1:0"
        self.region = "us-east-1"
        self.is_active = False

        # Queues for thread communication
        self.audio_in_queue = queue.Queue()  # browser → bedrock
        self.messages_out_queue = queue.Queue()  # bedrock → browser

        # Session identifiers
        self.prompt_name = str(uuid.uuid4())
        self.content_name = str(uuid.uuid4())
        self.audio_content_name = str(uuid.uuid4())

        # Bedrock thread
        self._thread = None

    def _bedrock_thread_run(self):
        """Run the Bedrock streaming using asyncio.run() which is proven to work"""
        try:
            asyncio.run(self._bedrock_session())
        except Exception as e:
            print(f"Bedrock thread error: {e}")
            import traceback
            traceback.print_exc()
        finally:
            self.is_active = False

    async def _bedrock_session(self):
        """The full Bedrock session running in its own event loop"""
        # Initialize client
        creds = EnvironmentCredentialsResolver()
        config = Config(
            endpoint_uri=f"https://bedrock-runtime.{self.region}.amazonaws.com",
            region=self.region,
            aws_credentials_identity_resolver=creds
        )
        client = BedrockRuntimeClient(config=config)

        # Start stream
        stream = await client.invoke_model_with_bidirectional_stream(
            InvokeModelWithBidirectionalStreamOperationInput(model_id=self.model_id)
        )

        self.is_active = True
        print(f"✅ Voice session started: {self.prompt_name[:8]}...")

        # System prompt
        system_prompt = (
            "You are Calyza AI, a friendly voice assistant for CalyzaTech. "
            "You help users learn about CalyzaTech's services including AI solutions, "
            "cloud infrastructure, data analytics, and custom software development. "
            "Keep responses concise and conversational since this is a voice interaction. "
            "Limit responses to 2-3 sentences."
        )

        # Send init events
        init_events = [
            json.dumps({"event": {"sessionStart": {"inferenceConfiguration": {"maxTokens": 1024, "topP": 0.9, "temperature": 0.7}}}}),
            self._create_prompt_start_event(),
            json.dumps({"event": {"contentStart": {"promptName": self.prompt_name, "contentName": self.content_name, "type": "TEXT", "role": "SYSTEM", "interactive": True, "textInputConfiguration": {"mediaType": "text/plain"}}}}),
            json.dumps({"event": {"textInput": {"promptName": self.prompt_name, "contentName": self.content_name, "content": system_prompt}}}),
            json.dumps({"event": {"contentEnd": {"promptName": self.prompt_name, "contentName": self.content_name}}}),
            json.dumps({"event": {"contentStart": {"promptName": self.prompt_name, "contentName": self.audio_content_name, "type": "AUDIO", "interactive": True, "role": "USER", "audioInputConfiguration": {"mediaType": "audio/lpcm", "sampleRateHertz": INPUT_SAMPLE_RATE, "sampleSizeBits": 16, "channelCount": 1, "audioType": "SPEECH", "encoding": "base64"}}}}),
        ]

        for event_json in init_events:
            event = InvokeModelWithBidirectionalStreamInputChunk(
                value=BidirectionalInputPayloadPart(bytes_=event_json.encode('utf-8'))
            )
            await stream.input_stream.send(event)
            await asyncio.sleep(0.05)

        # Start tasks
        send_task = asyncio.create_task(self._send_audio_loop(stream))
        recv_task = asyncio.create_task(self._receive_loop(stream))

        # Wait until session ends
        await asyncio.gather(send_task, recv_task, return_exceptions=True)

        # Cleanup
        try:
            end_events = [
                json.dumps({"event": {"contentEnd": {"promptName": self.prompt_name, "contentName": self.audio_content_name}}}),
                json.dumps({"event": {"promptEnd": {"promptName": self.prompt_name}}}),
                json.dumps({"event": {"sessionEnd": {}}}),
            ]
            for event_json in end_events:
                event = InvokeModelWithBidirectionalStreamInputChunk(
                    value=BidirectionalInputPayloadPart(bytes_=event_json.encode('utf-8'))
                )
                await stream.input_stream.send(event)
            await stream.input_stream.close()
        except:
            pass

        print(f"🔴 Voice session closed: {self.prompt_name[:8]}...")

    async def _send_audio_loop(self, stream):
        """Send audio from queue to Bedrock"""
        while self.is_active:
            try:
                # Non-blocking check for audio data
                try:
                    audio_b64 = self.audio_in_queue.get_nowait()
                except queue.Empty:
                    await asyncio.sleep(0.02)
                    continue

                if audio_b64 == "STOP":
                    self.is_active = False
                    break

                audio_event = json.dumps({
                    "event": {
                        "audioInput": {
                            "promptName": self.prompt_name,
                            "contentName": self.audio_content_name,
                            "content": audio_b64
                        }
                    }
                })
                event = InvokeModelWithBidirectionalStreamInputChunk(
                    value=BidirectionalInputPayloadPart(bytes_=audio_event.encode('utf-8'))
                )
                await stream.input_stream.send(event)

            except Exception as e:
                if self.is_active:
                    print(f"Send audio error: {e}")
                break

    async def _receive_loop(self, stream):
        """Receive responses from Bedrock and put in output queue"""
        tool_use_content = ""
        tool_use_id = ""
        tool_name = ""
        role = ""

        while self.is_active:
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

                    event = data['event']

                    if 'contentStart' in event:
                        role = event['contentStart'].get('role', '')

                    elif 'audioOutput' in event:
                        self.messages_out_queue.put({
                            "type": "audio",
                            "data": event['audioOutput']['content']
                        })

                    elif 'textOutput' in event:
                        text = event['textOutput']['content']
                        if '{ "interrupted" : true }' in text:
                            self.messages_out_queue.put({"type": "interrupted"})
                        elif role == 'USER':
                            self.messages_out_queue.put({"type": "transcript", "role": "user", "text": text})
                        else:
                            self.messages_out_queue.put({"type": "transcript", "role": "assistant", "text": text})

                    elif 'toolUse' in event:
                        tool_use_content = event['toolUse']
                        tool_name = event['toolUse']['toolName']
                        tool_use_id = event['toolUse']['toolUseId']

                    elif 'contentEnd' in event and event.get('contentEnd', {}).get('type') == 'TOOL':
                        # Process tool
                        tool_result = self._process_tool(tool_name, tool_use_content)
                        tc_name = str(uuid.uuid4())

                        tool_events = [
                            json.dumps({"event": {"contentStart": {"promptName": self.prompt_name, "contentName": tc_name, "interactive": False, "type": "TOOL", "role": "TOOL", "toolResultInputConfiguration": {"toolUseId": tool_use_id, "type": "TEXT", "textInputConfiguration": {"mediaType": "text/plain"}}}}}),
                            json.dumps({"event": {"toolResult": {"promptName": self.prompt_name, "contentName": tc_name, "content": json.dumps(tool_result) if isinstance(tool_result, dict) else tool_result}}}),
                            json.dumps({"event": {"contentEnd": {"promptName": self.prompt_name, "contentName": tc_name}}}),
                        ]

                        for event_json in tool_events:
                            ev = InvokeModelWithBidirectionalStreamInputChunk(
                                value=BidirectionalInputPayloadPart(bytes_=event_json.encode('utf-8'))
                            )
                            await stream.input_stream.send(ev)

                    elif 'completionEnd' in event:
                        self.messages_out_queue.put({"type": "done"})

            except StopAsyncIteration:
                break
            except Exception as e:
                if "InvalidStateError" in str(e) or "CANCELLED" in str(e):
                    continue
                if self.is_active:
                    print(f"Receive error: {e}")
                break

    def _process_tool(self, tool_name, tool_use_content):
        """Process tool use (runs in bedrock thread)"""
        if "calyzatech" in tool_name.lower() or "spotem" in tool_name.lower():
            try:
                content_dict = json.loads(tool_use_content['content'])
                query = content_dict.get('query', '')
                print(f"🔍 Voice KB query: {query}")
                if query:
                    return website_knowledge_retrieval(query)
            except Exception as e:
                return {"status": "error", "error": str(e)}
        return {}

    def _create_prompt_start_event(self):
        """Create promptStart event"""
        kb_schema = json.dumps({"type": "object", "properties": {"query": {"type": "string", "description": "The user question about CalyzaTech Company"}}, "required": ["query"]})
        return json.dumps({
            "event": {
                "promptStart": {
                    "promptName": self.prompt_name,
                    "textOutputConfiguration": {"mediaType": "text/plain"},
                    "audioOutputConfiguration": {
                        "mediaType": "audio/lpcm",
                        "sampleRateHertz": OUTPUT_SAMPLE_RATE,
                        "sampleSizeBits": 16,
                        "channelCount": 1,
                        "voiceId": "matthew",
                        "encoding": "base64",
                        "audioType": "SPEECH"
                    },
                    "toolUseOutputConfiguration": {"mediaType": "application/json"},
                    "toolConfiguration": {
                        "toolChoice": {"auto": {}},
                        "tools": [{
                            "toolSpec": {
                                "name": "retrieve_calyzatech_website",
                                "description": "Retrieves CalyzaTech company services, products, and case studies.",
                                "inputSchema": {"json": kb_schema}
                            }
                        }]
                    }
                }
            }
        })

    def start(self):
        """Start the Bedrock session in a separate thread"""
        self._thread = threading.Thread(target=self._bedrock_thread_run, daemon=True)
        self._thread.start()

    def stop(self):
        """Stop the session"""
        self.audio_in_queue.put("STOP")
        self.is_active = False


# WebSocket handler
async def voicebot_websocket_handler(websocket: WebSocket):
    """Handle a voice bot WebSocket connection"""
    await websocket.accept()
    session = WebVoiceBotSession(websocket)

    try:
        # Start Bedrock in separate thread
        session.start()

        # Wait for session to be active
        for _ in range(50):  # 5 second timeout
            if session.is_active:
                break
            await asyncio.sleep(0.1)

        if not session.is_active:
            await websocket.send_json({"type": "error", "message": "Failed to start voice session"})
            await websocket.close()
            return

        await websocket.send_json({"type": "ready"})

        # Two concurrent tasks:
        # 1. Read audio from browser → put in queue
        # 2. Read messages from bedrock queue → send to browser

        async def forward_to_browser():
            """Forward Bedrock responses to the browser"""
            while session.is_active:
                try:
                    msg = session.messages_out_queue.get_nowait()
                    await websocket.send_json(msg)
                except queue.Empty:
                    await asyncio.sleep(0.02)
                except Exception:
                    break

        forward_task = asyncio.create_task(forward_to_browser())

        # Read audio from browser
        while session.is_active:
            try:
                message = await asyncio.wait_for(websocket.receive_json(), timeout=60.0)
                msg_type = message.get("type")

                if msg_type == "audio":
                    session.audio_in_queue.put(message["data"])
                elif msg_type == "stop":
                    break

            except asyncio.TimeoutError:
                continue
            except WebSocketDisconnect:
                break
            except Exception as e:
                print(f"WebSocket error: {e}")
                break

        forward_task.cancel()

    except WebSocketDisconnect:
        pass
    except Exception as e:
        print(f"Voice bot error: {e}")
    finally:
        session.stop()

