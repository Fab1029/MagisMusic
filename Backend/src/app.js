import express from "express";
import deezerRoutes from "./routes/deezer.routes.js";
import jamRoutes from "./routes/jam.router.js";

const app = express();

app.use(express.json());
app.use("/api/deezer", deezerRoutes);
app.use("/api/jam", jamRoutes);

export default app;
