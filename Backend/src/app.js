import express from "express";
import deezerRoutes from "./routes/deezer.routes.js";

const app = express();

app.use(express.json());
app.use("/api/deezer", deezerRoutes);

export default app;
