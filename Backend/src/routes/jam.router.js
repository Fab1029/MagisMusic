import { Router } from "express";
import { JamController } from "../controllers/jam.controller.js";

const router = Router();

router.post("/create", JamController.create);

export default router;
