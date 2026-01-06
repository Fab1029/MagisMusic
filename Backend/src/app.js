import express from "express";
import deezerRoutes from "./controllers/deezer.controller.js";
import resourcesRoutes from "./controllers/resources.controller.js";
import playListRoutes from "./controllers/playlist.controller.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

const app = express();

app.use(express.json());

app.use("/api/v1/deezer", deezerRoutes);

app.use("/api/v1/resources", authMiddleware, resourcesRoutes);
app.use("/api/v1/playlists", authMiddleware, playListRoutes);

app.use(errorMiddleware);

export default app;
