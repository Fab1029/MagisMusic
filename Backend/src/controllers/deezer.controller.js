import { DeezerService } from "../services/deezer.service.js";

export const DeezerController  = {
    async getMostPopularTracks(req , res) {
        try {
            const limit = Number(req.query.limit) || 10;
            const tracks = await DeezerService.getMostPopularTracks(limit);
            
            res.json(tracks);

        } catch (error) {
            throw new Error(`Deezer Controller Error: ${error}`);
        }
    },

    async getMostPopularAlbumns(req , res) {
        try {
            const limit = Number(req.query.limit) || 10;
            const albumns = await DeezerService.getMostPopularAlbumns(limit);
            
            res.json(albumns);

        } catch (error) {
            throw new Error(`Deezer Controller Error: ${error}`);
        }
    },

    async getMostPopularArtists(req , res) {
        try {
            const limit = Number(req.query.limit) || 10;
            const artists = await DeezerService.getMostPopularArtists(limit);
            
            res.json(artists);

        } catch (error) {
            throw new Error(`Deezer Controller Error: ${error}`);
        }
    },

    async getMostPopularPlayLists(req , res) {
        try {
            const limit = Number(req.query.limit) || 10;
            const playLists = await DeezerService.getMostPopularPlayLists(limit);
            
            res.json(playLists);

        } catch (error) {
            throw new Error(`Deezer Controller Error: ${error}`);
        }
    },
}