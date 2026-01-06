import { Router } from "express";
import PlayListService from "../services/playlist.service.js";


const router = Router();
const service = new PlayListService();


router.post("/", async (req, res, next) => {
    try {
        const { name } = req.body;
        const userId = req.user.id;

        const response = await service.postPlayList(userId, name);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const userId = req.user.id;

        const response = await service.getPlayLists(userId);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const userId = req.user.id;
        const playListId = req.params.id;

        const response = await service.getPlayListById(userId, playListId);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

router.post("/:id/tracks", async (req, res, next) => {
    try {
        const playListId = req.params.id;
        const {tracks} = req.body;

        const response = await service.addTracksToPlayList(playListId, tracks);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

router.patch("/:id", async (req, res, next) => {
    try {
        const playListId = req.params.id;
        const { name } = req.body;

        const response = await service.updatePlayList(playListId, name);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

router.delete("/:playlistId/tracks/:trackId", async (req, res, next) => {
    try {
        const playListId = req.params.playlistId;
        const trackId = req.params.trackId;

        const response = await service.deleteTrackFromPlaylist(playListId, trackId);
        res.status(204).json(response);
    } catch (error) {
        next(error);
    }
});


router.delete("/:playlistId", async (req, res, next) => {
    try {
        const playListId = req.params.playlistId;

        const response = await service.deletePlaylist(playListId);

         if (response.length === 0) {
            return res.status(404).json({ message: "Playlist not found" });
        }
        res.status(204).json(response);
    } catch (error) {
        next(error);
    }
});


export default router;