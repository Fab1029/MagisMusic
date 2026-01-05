from fastapi import FastAPI
from contextlib import asynccontextmanager
from src.core.kafka import kafka_client
from src.api.v1.jam import router as jam_router
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    await kafka_client.start()
    yield
    await kafka_client.stop()

app = FastAPI(
    title="MagisMusic Jam Service",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

app.include_router(
    jam_router, 
    prefix="/api/v1/jam", 
    tags=["Jam"]
)