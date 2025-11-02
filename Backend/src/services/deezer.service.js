import { DeezerRepository } from "../repositories/deezer.repository.js";

export const DeezerService  = {

    async getMostPopularTracks (limit = 10) {
        try{
            return await DeezerRepository.getChartTracks(limit);
        }catch(error) {
            throw new Error(`Deezer Service Error: ${error}`);
        }
    }

}