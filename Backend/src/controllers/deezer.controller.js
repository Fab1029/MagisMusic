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

    async getSearchTracksByQuery(req , res) {
        try {
            const query = String(req.query.q);
            const tracks = await DeezerService.getSearchTracksByQuery(query);
            
            res.json(tracks);

        } catch (error) {
            throw new Error(`Deezer Controller Error: ${error}`);
        }
    },

    async getSearchAlbumsByQuery(req , res) {
        try {
            const query = String(req.query.q);
            const albums = await DeezerService.getSearchAlbumsByQuery(query);
            
            res.json(albums);

        } catch (error) {
            throw new Error(`Deezer Controller Error: ${error}`);
        }
    },

    async getSearchArtistsByQuery(req , res) {
        try {
            const query = String(req.query.q);
            const artists = await DeezerService.getSearchArtistsByQuery(query);
            
            res.json(artists);

        } catch (error) {
            throw new Error(`Deezer Controller Error: ${error}`);
        }
    },

    async getSearchPlayListsByQuery(req , res) {
        try {
            const query = String(req.query.q);
            const playLists = await DeezerService.getSearchPlayListsByQuery(query);
            
            res.json(playLists);

        } catch (error) {
            throw new Error(`Deezer Controller Error: ${error}`);
        }
    },

    
}