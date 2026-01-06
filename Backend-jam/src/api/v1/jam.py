from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from src.api.deps import auth_middleware
from src.services.jam import JamService
from src.core.config import settings
from aiokafka import AIOKafkaConsumer
import asyncio
import json

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.rooms: dict[str, list[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, jam_id: str):
        await websocket.accept()
        if jam_id not in self.rooms:
            self.rooms[jam_id] = []
        self.rooms[jam_id].append(websocket)

    def disconnect(self, websocket: WebSocket, jam_id: str):
        if jam_id in self.rooms:
            self.rooms[jam_id].remove(websocket)

manager = ConnectionManager()

@router.post("/")     
async def create_jam(user=Depends(auth_middleware)):
    jam_data = await JamService.create_jam()
    #link = f"{settings.FRONTEND_URL}/jam/{jam_data['jamId']}"
    return {**jam_data, "message": "Jam creado exitosamente"}

@router.websocket("/{jam_id}")
async def jam_websocket(websocket: WebSocket, jam_id: str):
    await manager.connect(websocket, jam_id)
    
    consumer = AIOKafkaConsumer(
        f"jam-{jam_id}",
        bootstrap_servers=settings.KAFKA_BOOTSTRAP_SERVERS,
        group_id=None 
    )
    await consumer.start()

    async def kafka_to_websocket():
        try:
            async for msg in consumer:
                event = json.loads(msg.value.decode("utf-8"))
                await websocket.send_json(event)
        except Exception as e:
            print(f"Kafka Consumer Error: {e}")

    listen_task = asyncio.create_task(kafka_to_websocket())

    try:
        while True:
            data = await websocket.receive_json()
            await JamService.send_event(jam_id, data)
    except WebSocketDisconnect:
        manager.disconnect(websocket, jam_id)
        listen_task.cancel()
        await consumer.stop()