import { Kafka } from "kafkajs";
import dotenv from 'dotenv';
// Carga las variables de entorno desde el .env
dotenv.config();

const kafka = new Kafka({
  clientId: "magis-music",
  //brokers: ["localhost:9092"], 
  //brokers: ["host.docker.internal:39092"],
  brokers: [process.env.KAFKA_URL],
});

export const kafkaAdmin = kafka.admin();
export const kafkaProducer = kafka.producer();
export const kafkaConsumer = kafka.consumer({ groupId: "magis-music-group" });

export async function connectKafka() {
  await Promise.all([
    kafkaAdmin.connect(),
    kafkaProducer.connect(),
  ]);
  console.log("Kafka conectado");
}

export async function disconnectKafka() {
  await Promise.all([
    kafkaProducer.disconnect(),
    kafkaAdmin.disconnect(),
  ]);
  console.log("Kafka desconectado");
}

export default kafka;
