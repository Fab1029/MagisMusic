import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "magis-music",
  brokers: ["localhost:9092"], 
});

export const kafkaProducer = kafka.producer();
export const kafkaConsumer = kafka.consumer({ groupId: "magis-music-group" });

export default kafka;
