import PlayListRepository from "../repositories/playlist.repository.js";
import CustomError from "../utils/error.js";

export default class PlayListService {

    constructor() {
        this.playListRepository = new PlayListRepository();
    }

    async postPlayList(userId, name) {
        if(name.trim().length === 0) { 
            throw new CustomError('Playlist name cannot be empty', 400);
        }

        return await this.playListRepository.postPlayList(userId, name);
    }

    async getPlayLists(userId) {
        return await this.playListRepository.getPlayLists(userId);
    }

    async getPlayListById(userId, playListId) {
        if(playListId < 1) { 
            throw new CustomError('Playlist ID cannot be negative', 400);
        }

        return await this.playListRepository.getPlayListById(userId, playListId);
    }

    async addTracksToPlayList(playListId, tracks) {
        if(playListId < 1) { 
            throw new CustomError('Playlist ID cannot be negative', 400);
        }

        if(tracks.length < 1) { 
            throw new CustomError('Tracks cannot be empty', 400);
        }

        return await this.playListRepository.addTracksToPlayList(playListId, tracks);
    }
    
}