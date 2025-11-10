import { JamService } from "../services/jam.service.js";

export const JamController = {
  async create(req, res) {
    try {
      const jam = await JamService.createJam();
      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
      const link = `${frontendUrl}/content/${jam.jamId}/Jam`;

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

  async sendEvent(req, res) {
    try {
      const { jamId } = req.params;
      const { action, song } = req.body;
      await JamService.sendEvent(jamId, { action, song });

    } catch (error) {
        console.log(`Jam Controller Error: ${error}`);
    }
  },

  async listenToJam(jamId, callback) {
    // Retorna el consumidor creado
    return await JamService.listenToJam(jamId, callback);
  },
};
