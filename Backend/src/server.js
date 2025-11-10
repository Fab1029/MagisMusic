import dotenv from 'dotenv';
// Carga las variables de entorno desde el .env
dotenv.config();

import app from './app.js';
import { connectKafka, disconnectKafka } from "./config/kafka.config.js";
import http from "http";
import { Server } from "socket.io";
import { JamController } from "./controllers/jam.controller.js";

const PORT = process.env.PORT;

//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

async function startServer() {
  try {
    await connectKafka(); // conectar una sola vez

    const server = http.createServer(app); //crear servidor HTTP
    const io = new Server(server, { cors: { origin: "*" } }); // crear servidor websocket

    const jamConsumers = new Map();

    io.on("connection", (socket) => {
      console.log("Usuario conectado:", socket.id);

      socket.on("joinJam", async (jamId) => {
        console.log(`Usuario ${socket.id} se unió al Jam ${jamId}`);
      
        // Crear consumidor solo si no existe
        if (!jamConsumers.has(jamId)) {
          const consumer = await JamController.listenToJam(jamId, (event) => {
            io.to(jamId).emit("jamEvent", event);
          });
          jamConsumers.set(jamId, consumer);
        }

        // Unir socket a la "sala" del Jam correspondiente
        socket.join(jamId);
      });

      socket.on("jamEvent", async ({ jamId, event }) => {
        console.log(`Evento recibido de ${socket.id}:`, event);
        await JamController.sendEvent(jamId, event);
      });

      socket.on("disconnect", () => {
        console.log("Usuario desconectado:", socket.id);
      });
    });

    server.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

    // Cuando se apaga el proceso, se cierra Kafka
    process.on("SIGINT", async () => {
      console.log("\nCerrando servidor...");
      await disconnectKafka();
      server.close(() => process.exit(0));
    });

  } catch (error) {
    console.error("Error al iniciar servidor:", error);
  }
}

startServer();