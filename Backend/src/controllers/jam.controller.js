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
        throw new Error(`Jam Controller Error: ${error}`);
    }
  },

  async sendEvent(req, res) {
    try {
      const { jamId } = req.params;
      const { action, song } = req.body;
      await JamService.sendEvent(jamId, { action, song });

      res.json({ success: true });

    } catch (error) {
        throw new Error(`Jam Controller Error: ${error}`);
    }
  },
};
