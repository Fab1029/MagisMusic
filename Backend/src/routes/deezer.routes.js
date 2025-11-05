import { Router } from "express";
import { DeezerController } from "../controllers/deezer.controller.js";

const router = Router();

router.get("/tracks", DeezerController.getMostPopularTracks);
router.get("/albumns", DeezerController.getMostPopularAlbumns);
router.get("/artists", DeezerController.getMostPopularArtists);
router.get("/playlists", DeezerController.getMostPopularPlayLists);

router.get("/search/tracks", DeezerController.getSearchTracksByQuery);
router.get("/search/albumns", DeezerController.getSearchAlbumsByQuery);
router.get("/search/artists", DeezerController.getSearchArtistsByQuery);
router.get("/search/playlists", DeezerController.getSearchPlayListsByQuery);

router.get("/tracks/:id", DeezerController.getTrackById);
router.get("/albums/:id", DeezerController.getAlbumById);
router.get("/artists/:id", DeezerController.getArtistById);
router.get("/playlists/:id", DeezerController.getPlayListById);

export default router;
