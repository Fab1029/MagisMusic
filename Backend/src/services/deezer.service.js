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

    async getSearchTracksByQuery (query) {
        try{
            return await DeezerRepository.getSearchTracks(query);
        }catch(error) {
            throw new Error(`Deezer Service Error: ${error}`);
        }
    },

    async getSearchAlbumsByQuery (query) {
        try{
            return await DeezerRepository.getSearchAlbums(query);
        }catch(error) {
            throw new Error(`Deezer Service Error: ${error}`);
        }
    },

    async getSearchArtistsByQuery (query) {
        try{
            return await DeezerRepository.getSearchArtists(query);
        }catch(error) {
            throw new Error(`Deezer Service Error: ${error}`);
        }
    },

    async getSearchPlayListsByQuery (query) {
        try{
            return await DeezerRepository.getSearchPlayLists(query);
        }catch(error) {
            throw new Error(`Deezer Service Error: ${error}`);
        }
    },

    async getTrackById (id) {
        try{
            return await DeezerRepository.getTrackById(id);
        }catch(error) {
            throw new Error(`Deezer Service Error: ${error}`);
        }
    },

    async getArtistById (id) {
        try{
            return await DeezerRepository.getArtistById(id);
        }catch(error) {
            throw new Error(`Deezer Service Error: ${error}`);
        }
    },

    async getAlbumById (id) {
        try{
            return await DeezerRepository.getAlbumById(id);
        }catch(error) {
            throw new Error(`Deezer Service Error: ${error}`);
        }
    },

    async getPlayListById (id) {
        try{
            return await DeezerRepository.getPlayListById(id);
        }catch(error) {
            throw new Error(`Deezer Service Error: ${error}`);
        }
    },
}