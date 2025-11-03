import { DeezerRepository } from "../repositories/deezer.repository.js";

export const DeezerService  = {

    async getMostPopularTracks (limit = 10) {
        try{
            return await DeezerRepository.getChartTracks(limit);
        }catch(error) {
            throw new Error(`Deezer Service Error: ${error}`);
        }
    },

    async getMostPopularAlbumns (limit = 10) {
        try{
            return await DeezerRepository.getChartAlbums(limit);
        }catch(error) {
            throw new Error(`Deezer Service Error: ${error}`);
        }
    },

    async getMostPopularArtists (limit = 10) {
        try{
            return await DeezerRepository.getChartArtists(limit);
        }catch(error) {
            throw new Error(`Deezer Service Error: ${error}`);
        }
    },

    async getMostPopularPlayLists (limit = 10) {
        try{
            return await DeezerRepository.getChartPlayLists(limit);
        }catch(error) {
            throw new Error(`Deezer Service Error: ${error}`);
        }
    },

}