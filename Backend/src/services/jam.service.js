import { v4 as uuidv4 } from "uuid";
import { createTopic } from "./kafka.service.js";
import { createConsumer } from "../config/kafka.factory.js"
import { kafkaProducer } from "../config/kafka.config.js"

export const JamService = {
  async createJam() {
    try {
      const jamId = uuidv4();
    console.log(jamId)
    // guardar en la base
    const topic = `jam-${jamId}`;

    await createTopic(topic);

    return { jamId, topic, message: "Jam creado exitosamente" };

    } catch (error) {
        console.error("JamService.createJam Error:", error);
         throw new Error(`Jam Service Error: ${error}`);
    }
  },

  async sendEvent(jamId, event) {
    try {
      await kafkaProducer.send({
        topic: `jam-${jamId}`,
        messages: [{ value: JSON.stringify(event) }],
      });
      console.log(`Evento enviado a jam-${jamId}`);
    } catch (error) {
        console.error("JamService.sendEvent Error:", error);
        throw new Error(`Jam Service Error: ${error}`);
    }
  },

  async listenToJam(jamId, groupId, callback) {
    try {
      const consumer = createConsumer(groupId); //el group id debe ser unico para cada consumidor
      await consumer.connect();

      await consumer.subscribe({ topic: `jam-${jamId}`, fromBeginning: false });

      await consumer.run({
        eachMessage: async ({ message }) => {
          const event = JSON.parse(message.value.toString());
          callback(event);
        },
      });
    } catch (error) {
        console.error("JamService.listenToJam Error:", error);
        throw new Error(`Jam Service Error: ${error}`);
    }
  },
};
