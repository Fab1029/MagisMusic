import { JamService } from "../services/jam.service.js";

export const JamController = {
  async create(req, res) {
    try {
      const jam = await JamService.createJam();
      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
      const link = `${frontendUrl}/jam/${jam.jamId}`;

      res.status(201).json({
        succes: true,
        ...jam,
        link,
      });

    } catch (error) {
        console.error("Jam Controller Error:", error);
        res.status(500).json({
          success: false,
          message: "Error al crear el jam",
          error: error.message,
        });
    }
  },

  async sendEvent(jamId, event) {
    try {
      await JamService.sendEvent(jamId, event);
    } catch (error) {
        console.log(`Jam Controller Error: ${error}`);
    }
  },

  async listenToJam(jamId, callback) {
    // Retorna el consumidor creado
    const groupId = `jam-group-${jamId}`;
    return await JamService.listenToJam(jamId, groupId, callback);
  },
};
