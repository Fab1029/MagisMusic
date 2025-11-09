import { kafkaProducer, kafkaConsumer } from "../config/kafka.config.js";
import { v4 as uuidv4 } from "uuid";

export const JamService = {
  async createJam() {
    const jamId = uuidv4();
    // guardar en la base
    const topic = `jam-${jamId}`;
    // ... inicializar productor/consumidor si hace falta
    return { jamId, topic, message: "Jam creado exitosamente" };
  },

  async sendEvent(jamId, event) {
    await kafkaProducer.send({
      topic: `jam-${jamId}`,
      messages: [{ value: JSON.stringify(event) }],
    });
  },

  async listenToJam(jamId, callback) {
    await kafkaConsumer.subscribe({ topic: `jam-${jamId}`, fromBeginning: false });

    await kafkaConsumer.run({
      eachMessage: async ({ message }) => {
        const event = JSON.parse(message.value.toString());
        callback(event);
      },
    });
  },
};
