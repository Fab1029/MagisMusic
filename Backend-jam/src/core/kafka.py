from aiokafka import AIOKafkaProducer
from aiokafka.admin import NewTopic, AIOKafkaAdminClient
from src.core.config import settings

class KafkaClient:
    def __init__(self):
        self.producer = None

    async def start(self):
        self.producer = AIOKafkaProducer(bootstrap_servers=settings.KAFKA_BOOTSTRAP_SERVERS)
        await self.producer.start()

    async def stop(self):
        if self.producer:
            await self.producer.stop()

    async def create_topic(self, topic_name: str):
        admin = AIOKafkaAdminClient(bootstrap_servers=settings.KAFKA_BOOTSTRAP_SERVERS)
        await admin.start()
        try:
            topic = NewTopic(name=topic_name, num_partitions=1, replication_factor=1)
            await admin.create_topics([topic])
        finally:
            await admin.close()

kafka_client = KafkaClient()