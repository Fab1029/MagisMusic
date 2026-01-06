import  DeezerRepository  from "../repositories/deezer.repository.js";
import CustomError from "../utils/error.js";

export default class DeezerService   {

    constructor() {
        this.deezerRepository = new DeezerRepository();
    }

    async getMostPopularTracks (limit = 10) {
        if (limit < 1) 
            throw new CustomError('Limit must be greater than 0', 400);
        return await this.deezerRepository.getChartTracks(limit);
    }

    async getMostPopularAlbumns (limit = 10) {
        if (limit < 1) 
            throw new CustomError('Limit must be greater than 0', 400);
        return await this.deezerRepository.getChartAlbums(limit);
    }

    async getMostPopularArtists (limit = 10) {
        if (limit < 1) 
            throw new CustomError('Limit must be greater than 0', 400);
        return await this.deezerRepository.getChartArtists(limit);
    }

    async getMostPopularPlayLists (limit = 10) {
        if (limit < 1) 
            throw new CustomError('Limit must be greater than 0', 400);
        return await this.deezerRepository.getChartPlayLists(limit);
    }

    async getSearchTracksByQuery (query) {
        if(!query || query.trim() === '')
            throw new CustomError('Query must not be empty', 400);
        return await this.deezerRepository.getSearchTracks(query);
    }

    async getSearchAlbumsByQuery (query) {
        if(!query || query.trim() === '')
            throw new CustomError('Query must not be empty', 400);
        return await this.deezerRepository.getSearchAlbums(query);
    }

    async getSearchArtistsByQuery (query) {
        if(!query || query.trim() === '')
            throw new CustomError('Query must not be empty', 400);
        return await this.deezerRepository.getSearchArtists(query);
    }

    async getSearchPlayListsByQuery (query) {
        if(!query || query.trim() === '')
            throw new CustomError('Query must not be empty', 400);
        return await this.deezerRepository.getSearchPlayLists(query);
    }

    async getTrackById (id) {
        if (id < 1)
            throw new CustomError('ID must be greater than 0', 400);
        return await this.deezerRepository.getTrackById(id);
    }

    async getArtistById (id) {
        if (id < 1)
            throw new CustomError('ID must be greater than 0', 400);
        return await this.deezerRepository.getArtistById(id);
    }

    async getAlbumById (id) {
        if (id < 1)
            throw new CustomError('ID must be greater than 0', 400);
        return await this.deezerRepository.getAlbumById(id);
    }

    async getPlayListById (id) {
        if (id < 1)
            throw new CustomError('ID must be greater than 0', 400);
        return await this.deezerRepository.getPlayListById(id);
    }
}