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

    async updatePlayList(playListId, name) {
        if(playListId < 1) { 
            throw new CustomError("Playlist ID invalid", 400);
        }

        if (!name || name.trim().length === 0) {
            throw new CustomError("The playlist name cannot be empty")
        }

        return await this.playListRepository.updatePlayList(playListId, name);
    }
    
    async deleteTrackFromPlaylist(playListId, trackId) {
        if(playListId < 1) { 
            throw new CustomError("Playlist ID invalid", 400);
        }

        if(trackId < 1) { 
            throw new CustomError("Track ID invalid", 400);
        }

        return await this.playListRepository.deleteTrackFromPlaylist(playListId, trackId)
    }

    async deletePlaylist(playListId) {
        if(playListId < 1) { 
            throw new CustomError("Playlist ID invalid", 400);
        }

        return await this.playListRepository.deletePlaylist(playListId)
    }

}