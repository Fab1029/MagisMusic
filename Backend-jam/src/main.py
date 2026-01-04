from fastapi import FastAPI
from contextlib import asynccontextmanager
from src.core.kafka import kafka_client
from src.api.v1.jam import router as jam_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    await kafka_client.start()
    yield
    await kafka_client.stop()

app = FastAPI(
    title="MagisMusic Jam Service",
    lifespan=lifespan
)

app.include_router(
    jam_router, 
    prefix="/api/v1/jam", 
    tags=["Jam"]
)