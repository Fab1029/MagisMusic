import  { supabase }  from "../config/supabase.config.js";
import CustomError from "../utils/error.js";
import DeezerRepository from "./deezer.repository.js";

export default class PlayListRepository {

    constructor() {
        this.db = supabase;
        this.repo_deezer = new DeezerRepository();
    }

    async postPlayList(userId, name) {
        const { data, error } = await this.db
            .from("PlayList")
            .insert([{ id_user: userId, name }])
            .select('*')
            .single();

        if (error) {
            throw new CustomError("Internal server error", 500);
        }

            return data;
    }
    

    async getPlayLists(userId) {
        const { data: dataInit, error } = await supabase
            .rpc('get_playlists_with_tracks', {p_id_user: userId});
        
        if (error) {
            throw new CustomError("Internal server error", 500);
        }

        if (!dataInit) {
            throw new CustomError("Playlists not found", 404);
        }


        const data = await Promise.all(
            dataInit.map(async (playList) => {
            const tracks = await Promise.all(
                playList.tracks.map(trackId =>
                this.repo_deezer.getTrackById(trackId)
                )
            );

            return {
                id_playlist: playList.id_playlist,
                name: playList.name,
                tracks
            };
            })
        );

        return data;
    }

    async getPlayListById(userId, playListId) {
        const { data: dataInit, error } = await supabase
            .rpc('get_playlist_by_id', {
            p_id_user: userId,
            p_id_playlist: playListId
            });

        if (error) {
            throw new CustomError("Internal server error", 500);
        }

        if (!dataInit) {
            throw new CustomError("Playlist not found", 404);
        }

        const tracks = await Promise.all(
            dataInit.tracks.map(trackId =>
            this.repo_deezer.getTrackById(trackId)
            )
        );

        return {
            id_playlist: dataInit.id_playlist,
            name: dataInit.name,
            tracks
        };
    }

    async addTracksToPlayList(playListId, tracks) {
        const {data, error } = await this.db
            .from('PlayList_Track')
            .insert(tracks.map(trackId => ({
                id_playlist: playListId,
                id_track: trackId
            })))
            .select('*');

        if (error) {
            throw new CustomError("Internal server error", 500);
        }

        return data;
    }   

    async updatePlayList(playListId, name) {
        const {data, error} = await this.db
            .from('PlayList')
            .update({name})
            .eq('id', playListId)
            .select('*')
            .single();

        if (error) {
            throw new CustomError("Internal server error", 500);
        }

        return data;
    }

}