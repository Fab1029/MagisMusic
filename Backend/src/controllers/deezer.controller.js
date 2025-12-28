import { Router } from "express";
import  DeezerService  from "../services/deezer.service.js";

const router = Router();
const service = new DeezerService();


router.get("/tracks", async (req , res, next) => {
    try {
        const { q, limit = 10 } = req.query;
        
        const data = q
        ? await service.getSearchTracksByQuery(String(q))
        : await service.getMostPopularTracks(Number(limit));

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

router.get("/albums", async (req , res, next) => {
    try {
        const { q, limit = 10 } = req.query;

        const data = q
        ? await service.getSearchAlbumsByQuery(q)
        : await service.getMostPopularAlbumns(Number(limit));

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

router.get("/artists", async (req , res, next) => {
    try {
        const { q, limit = 10 } = req.query;

        const data = q
        ? await service.getSearchArtistsByQuery(q)
        : await service.getMostPopularArtists(Number(limit));

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

router.get("/playlists", async (req , res, next) => {
    try {
        const { q, limit = 10 } = req.query;

        const data = q
        ? await service.getSearchPlayListsByQuery(q)
        : await service.getMostPopularPlayLists(Number(limit));

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

router.get("/tracks/:id", async (req , res, next) => {
    try {
        const id = Number(req.params.id);
        const data = await service.getTrackById(id);
    
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

router.get("/albums/:id", async (req , res, next) => {
    try {
        const id = Number(req.params.id);
        const data = await service.getAlbumById(id);

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

router.get("/artists/:id", async (req , res, next) => {
    try {
        const id = Number(req.params.id);
        const data = await service.getArtistById(id);

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

router.get("/playlists/:id", async (req , res, next) => {
    try {
        const id = Number(req.params.id);
        const data = await service.getPlayListById(id);

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

export default router;