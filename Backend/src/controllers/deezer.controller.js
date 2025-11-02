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
    }
}