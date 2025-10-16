from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# 允许跨域访问（React 在不同端口）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    user_message = data.get("message")

    async def stream():
        response = await openai.ChatCompletion.acreate(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": user_message}],
            stream=True,
        )
        async for chunk in response:
            if chunk["choices"][0]["delta"].get("content"):
                yield chunk["choices"][0]["delta"]["content"]

    return StreamingResponse(stream(), media_type="text/plain")

# 启动命令: uvicorn main:app --reload --port 8000
