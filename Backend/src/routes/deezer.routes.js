import { Router } from "express";
import { DeezerController } from "../controllers/deezer.controller.js";

const router = Router();

router.get("/tracks", DeezerController.getMostPopularTracks);
router.get("/albumns", DeezerController.getMostPopularAlbumns);
router.get("/artists", DeezerController.getMostPopularArtists);
router.get("/playlists", DeezerController.getMostPopularPlayLists);

export default router;
