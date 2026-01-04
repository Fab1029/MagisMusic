import uuid
import json
import logging
from src.core.kafka import kafka_client

logger = logging.getLogger(__name__)

class JamService:
    @staticmethod
    async def create_jam():
        try:
            jam_id = str(uuid.uuid4())
            print(jam_id)
            topic = f"jam-{jam_id}"
            await kafka_client.create_topic(topic)
            return {"jamId": jam_id, "topic": topic}
        except Exception as e:
            logger.error(f"Jam Service Error: {e}")
            raise e

    @staticmethod
    async def send_event(jam_id: str, event: dict):
        try:
            topic = f"jam-{jam_id}"
            value = json.dumps(event).encode("utf-8")
            await kafka_client.producer.send_and_wait(topic, value)
            print("Evento enviado")
        except Exception as e:
            logger.error(f"Jam Service Error: {e}")
            raise e