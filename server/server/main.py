from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
)


class Url(BaseModel):
    url: str


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/url")
async def get_url(url: Url):
    async with httpx.AsyncClient() as client:
        response = await client.get(url.url)

    if response.status_code == 308:
        async with httpx.AsyncClient() as client:
            response = await client.get(response.headers["location"])

    return {"response": response.text}
