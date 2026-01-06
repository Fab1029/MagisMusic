import CustomError from "../utils/error.js";

export default class DeezerRepository   {

    constructor() {
        this.BASE_URL = 'https://api.deezer.com/';
        this.BASE_ERROR = {
            4: "QUOTA",
            100: "ITEMS_LIMIT_EXCEEDED",
            200: "PERMISSION",
            300: "TOKEN_INVALID",
            500: "PARAMETER",
            501: "PARAMETER_MISSING",
            600: "QUERY_INVALID",
            700: "SERVICE_BUSY",
            800: "DATA_NOT_FOUND",
            901: "INDIVIDUAL_ACCOUNT_NOT_ALLOWED"
        };
    }

    async getTrackById (id)  {
        try{
            const response= await fetch(`${this.BASE_URL}/track/${id}`);
            const data = await response.json();

            if(data.error) {
                const message = this.BASE_ERROR[data.error.code] || "Unknown Deezer API Error";
                throw new CustomError(message, data.error.code || 502);
            };
            
            const track = {
                    id: data.id,
                    title: data.title,
                    duration: (data.duration / 60).toFixed(2),
                    preview: data.preview,
                    album: data.album.title,
                    image: data.album.cover_xl,
                    artist: data.artist.name,
            };

            return track;
        }catch(error) {
            throw new CustomError(`Internal Server Error:: ${error}`, 500);
        }        
    }

    async getAlbumById (id)  {
        try{
            const response= await fetch(`${this.BASE_URL}/album/${id}`);
            const data = await response.json();

            if(data.error) {
                const message = this.BASE_ERROR[data.error.code] || "Unknown Deezer API Error";
                throw new CustomError(message, data.error.code || 502);
            };
            
            const album = {
                id: data.id,
                title: data.title,
                image: data.cover_xl,
                artist: data.artist.name,
                tracks: data.tracks.data.map((item) => (
                    {
                        id: item.id,
                        title: item.title,
                        duration: (item.duration / 60).toFixed(2),
                        preview: item.preview,
                        album: data.title,
                        image: data.cover_xl,
                        artist: data.artist.name,
                    }
                ))
            };

            return album;
        }catch(error) {
            throw new CustomError(`Internal Server Error:: ${error}`, 500);
        }        
    }

    async getPlayListById (id)  {
        try{
            const response= await fetch(`${this.BASE_URL}/playlist/${id}`);
            const data = await response.json();

            if(data.error) {
                const message = this.BASE_ERROR[data.error.code] || "Unknown Deezer API Error";
                throw new CustomError(message, data.error.code || 502);
            };
            
            const playlist = {
                id: data.id,
                title: data.title,
                description: data.description,
                image: data.picture_xl,
                tracks: data.tracks.data.map((item) => (
                    {
                        id: item.id,
                        title: item.title,
                        duration: (item.duration / 60).toFixed(2),
                        preview: item.preview,
                        album: item.album.title,
                        image: item.album.cover_xl,
                        artist: item.artist.name,
                    }
                ))
            };

            return playlist;
        }catch(error) {
            throw new CustomError(`Internal Server Error:: ${error}`, 500);
        }        
    }

    async getArtistById (id)  {
        try{
            const responseArtist = await fetch(`${this.BASE_URL}/artist/${id}`);
            const dataArtist = await responseArtist.json();

            if(dataArtist.error) {
                const message = this.BASE_ERROR[data.error.code] || "Unknown Deezer API Error";
                throw new CustomError(message, data.error.code || 502);
            };

            const responseTracks = await fetch(`${this.BASE_URL}/artist/${id}/top?limit=50`);
            const dataTracks = await responseTracks.json();
            
            if(dataTracks.error) {
                const message = this.BASE_ERROR[data.error.code] || "Unknown Deezer API Error";
                throw new CustomError(message, data.error.code || 502);
            };
            
            const artist = {
                id: dataArtist.id,
                name: dataArtist.name,
                image: dataArtist.picture_xl,
                tracks: dataTracks.data.map((item) => (
                    {
                        id: item.id,
                        title: item.title,
                        duration: (item.duration / 60).toFixed(2),
                        preview: item.preview,
                        album: item.album.title,
                        image: item.album.cover_xl,
                        artist: dataArtist.name,
                    }
                ))
            };

            return artist;
        }catch(error) {
            throw new CustomError(`Internal Server Error:: ${error}`, 500);
        }        
    }

    async getChartTracks (limit = 10)  {
        try{
            const response= await fetch(`${this.BASE_URL}/chart/0/tracks?limit=${limit}`);
            const data = await response.json();

            if(data.error) {
                const message = this.BASE_ERROR[data.error.code] || "Unknown Deezer API Error";
                throw new CustomError(message, data.error.code || 502);
            }
            
            const tracks = data.data.map((item) => (
                {
                    id: item.id,
                    title: item.title,
                    duration: (item.duration / 60).toFixed(2),
                    preview: item.preview,
                    album: item.album.title,
                    image: item.album.cover_xl,
                    artist: item.artist.name,
                }
            ));

            return tracks;
        }catch(error) {
            throw new CustomError(`Internal Server Error:: ${error}`, 500);
        }        
    }

    async getChartAlbums (limit = 10)  {
        try{
            const response= await fetch(`${this.BASE_URL}/chart/0/albums?limit=${limit}`);
            const data = await response.json();

            if(data.error) {
                const message = this.BASE_ERROR[data.error.code] || "Unknown Deezer API Error";
                throw new CustomError(message, data.error.code || 502);
            }
            
            const albums = data.data.map((item) => (
                {
                    id: item.id,
                    title: item.title,
                    trackList: item.tracklist,
                    image: item.cover_xl,
                    artist: item.artist.name,
                }
            ));

            return albums;
        }catch(error) {
            throw new CustomError(`Internal Server Error:: ${error}`, 500);
        }        
    }

    async getChartArtists (limit = 10)  {
        try{
            const response= await fetch(`${this.BASE_URL}/chart/0/artists?limit=${limit}`);
            const data = await response.json();

            if(data.error) {
                const message = this.BASE_ERROR[data.error.code] || "Unknown Deezer API Error";
                throw new CustomError(message, data.error.code || 502);
            }
            
            const artists = data.data.map((item) => (
                {
                    id: item.id,
                    name: item.name,
                    image: item.picture_xl,
                    trackList: item.tracklist,
                }
            ));

            return artists;
        }catch(error) {
            throw new CustomError(`Internal Server Error:: ${error}`, 500);
        }        
    }

    async getChartPlayLists (limit = 10)  {
        try{
            const response= await fetch(`${this.BASE_URL}/chart/0/playlists?limit=${limit}`);
            const data = await response.json();

            if(data.error) {
                const message = this.BASE_ERROR[data.error.code] || "Unknown Deezer API Error";
                throw new CustomError(message, data.error.code || 502);
            }
            
            const playLists = data.data.map((item) => (
                {
                    id: item.id,
                    title: item.title,
                    image: item.picture_xl,
                    trackList: item.tracklist,
                }
            ));

            return playLists;
        }catch(error) {
            throw new CustomError(`Internal Server Error:: ${error}`, 500);
        }        
    }

    async getSearchTracks (query)  {
        try{
            const response= await fetch(`${this.BASE_URL}/search/track?q=${query}`);
            const data = await response.json();

            if(data.error) {
                const message = this.BASE_ERROR[data.error.code] || "Unknown Deezer API Error";
                throw new CustomError(message, data.error.code || 502);
            }
            
            const tracks = data.data.map((item) => (
                {
                    id: item.id,
                    title: item.title,
                    duration: (item.duration / 60).toFixed(2),
                    preview: item.preview,
                    album: item.album.title,
                    image: item.album.cover_xl,
                    artist: item.artist.name,
                }
            ));

            return tracks;
        }catch(error) {
            throw new CustomError(`Internal Server Error:: ${error}`, 500);
        }        
    }

    async getSearchAlbums (query)  {
        try{
            const response= await fetch(`${this.BASE_URL}/search/album?q=${query}`);
            const data = await response.json();

            if(data.error) {
                const message = this.BASE_ERROR[data.error.code] || "Unknown Deezer API Error";
                throw new CustomError(message, data.error.code || 502);
            }
            
            const albums = data.data.map((item) => (
                {
                    id: item.id,
                    title: item.title,
                    trackList: item.tracklist,
                    image: item.cover_xl,
                    artist: item.artist.name,
                }
            ));

            return albums;
        }catch(error) {
            throw new CustomError(`Internal Server Error:: ${error}`, 500);
        }        
    }

    async getSearchArtists (query)  {
        try{
            const response= await fetch(`${this.BASE_URL}/search/artist?q=${query}`);
            const data = await response.json();

            if(data.error) {
                const message = this.BASE_ERROR[data.error.code] || "Unknown Deezer API Error";
                throw new CustomError(message, data.error.code || 502);
            }
            
            const artists = data.data.map((item) => (
                {
                    id: item.id,
                    name: item.name,
                    image: item.picture_xl,
                    trackList: item.tracklist,
                }
            ));

            return artists;
        }catch(error) {
            throw new CustomError(`Internal Server Error:: ${error}`, 500);
        }        
    }

    async getSearchPlayLists (query)  {
        try{
            const response= await fetch(`${this.BASE_URL}/search/playlist?q=${query}`);
            const data = await response.json();

            if(data.error) {
                const message = this.BASE_ERROR[data.error.code] || "Unknown Deezer API Error";
                throw new CustomError(message, data.error.code || 502);
            }
            
            const playLists = data.data.map((item) => (
                {
                    id: item.id,
                    title: item.title,
                    image: item.picture_xl,
                    trackList: item.tracklist,
                }
            ));

            return playLists;
        }catch(error) {
            throw new CustomError(`Internal Server Error:: ${error}`, 500);
        }        
    }
}