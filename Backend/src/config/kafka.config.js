import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "magis-music",
  //brokers: ["localhost:9092"], 
  brokers: ["host.docker.internal:39092"],
  //brokers: ["10.26.19.180:39092"],
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
