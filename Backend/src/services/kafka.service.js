import { kafkaAdmin} from "../config/kafka.config.js";

export async function createTopic(topicName) {
  try {
    const existingTopics = await kafkaAdmin.listTopics();

    if (!existingTopics.includes(topicName)) {
      await kafkaAdmin.createTopics({ topics: [{ topic: topicName }] });
      console.log(`Topic ${topicName} creado`);
    } else {
      console.log(`Topic ${topicName} ya existe`);
    }
  } catch (error) {
      console.error("Error al crear topic:", error);
      throw new Error(`Kafka Service Error: ${error}`);
  }

}
