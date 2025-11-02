import { Router } from "express";
import { DeezerController } from "../controllers/deezer.controller.js";

const router = Router();

router.get("/tracks", DeezerController.getMostPopularTracks);

export default router;
