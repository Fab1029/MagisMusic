const BASE_URL = "/api/v1/deezer"
import { saveTrackOffline } from "@/lib/offlineDb";
import type{ Track } from "@/models/Track";

export const getMostPopularTracks = async(limit = 10) => {
    try{
        const response = await fetch(`${BASE_URL}/tracks?limit=${limit}`);

        if (!response.ok) {
            throw new Error('Error al obtener canciones populares');            
        }

        return await response.json();

    }catch(error) {
        throw new Error('Error al obtener canciones populares');
    }
};

export const getMostPopularAlbums = async(limit = 10) => {
    try{
        const response = await fetch(`${BASE_URL}/albums?limit=${limit}`);

        if (!response.ok) {
            throw new Error('Error al obtener albumes populares');            
        }

        return await response.json();

    }catch(error) {
        throw new Error('Error al obtener albumes populares');
    }
};

export const getMostPopularPlayLists = async(limit = 10) => {
    try{
        const response = await fetch(`${BASE_URL}/playlists?limit=${limit}`);

        if (!response.ok) {
            throw new Error('Error al obtener play lists populares');            
        }

        return await response.json();

    }catch(error) {
        throw new Error('Error al obtener play lists populares');
    }
};

export const getMostPopularArtists = async(limit = 10) => {
    try{
        const response = await fetch(`${BASE_URL}/artists?limit=${limit}`);

        if (!response.ok) {
            throw new Error('Error al obtener artistas populares');            
        }

        return await response.json();

    }catch(error) {
        throw new Error('Error al obtener artistas populares');
    }
};

export const getSearchTracksByQuery = async(query: any) => {
    try{
        const response = await fetch(`${BASE_URL}/tracks?q=${query}`);

        if (!response.ok) {
            throw new Error('Error al obtener canciones por busqueda');            
        }

        return await response.json();

    }catch(error) {
        throw new Error('Error al obtener canciones por busqueda');    
    }
};

export const getSearchAlbumnsByQuery = async(query: string) => {
    try{
        const response = await fetch(`${BASE_URL}/albums?q=${query}`);

        if (!response.ok) {
            throw new Error('Error al obtener albumes por busqueda');            
        }

        return await response.json();

    }catch(error) {
        throw new Error('Error al obtener albumes por busqueda');    
    }
};

export const getSearchPlayListsByQuery = async(query: string) => {
    try{
        const response = await fetch(`${BASE_URL}/playlists?q=${query}`);

        if (!response.ok) {
            throw new Error('Error al obtener play lists por busqueda');            
        }

        return await response.json();

    }catch(error) {
        throw new Error('Error al obtener play lists por busqueda');    
    }
};

export const getSearchArtistsByQuery = async(query: string) => {
    try{
        const response = await fetch(`${BASE_URL}/artists?q=${query}`);

        if (!response.ok) {
            throw new Error('Error al obtener artistas por busqueda');            
        }

        return await response.json();

    }catch(error) {
        throw new Error('Error al obtener artistas por busqueda');    
    }
};

export const getTrackById = async(id: number) => {
    try{
        const response = await fetch(`${BASE_URL}/tracks/${id}`);

        if (!response.ok) {
            throw new Error('Error al obtener cancion por id');            
        }

        return await response.json();

    }catch(error) {
        throw new Error('Error al obtener cancion por id');    
    }
};

export const getAlbumById = async(id: number) => {
    try{
        const response = await fetch(`${BASE_URL}/albums/${id}`);

        if (!response.ok) {
            throw new Error('Error al obtener album por id');            
        }

        return await response.json();

    }catch(error) {
        throw new Error('Error al obtener album por id');    
    }
};

export const getArtistById = async(id: number) => {
    try{
        const response = await fetch(`${BASE_URL}/artists/${id}`);

        if (!response.ok) {
            throw new Error('Error al obtener artistas por id');            
        }

        return await response.json();

    }catch(error) {
        throw new Error('Error al obtener artistas por id');    
    }
};

export const getPlayListById = async(id: number) => {
    try{
        const response = await fetch(`${BASE_URL}/playlists/${id}`);

        if (!response.ok) {
            throw new Error('Error al obtener play list por id');            
        }

        return await response.json();

    }catch(error) {
        throw new Error('Error al obtener play list por id');      
    }
};

export const downloadTrack = async (track: Track, isIndividual: boolean = true) => {
  try {
    const cache = await caches.open('music-tracks-cache');
    const cachedResponse = await cache.match(track.preview);
    
    // Si ya existe en cache, igual actualizamos IndexedDB 
    if (cachedResponse) {
      await saveTrackOffline(track, isIndividual);
      return true;
    }

    const response = await fetch(track.preview, {
      mode: 'cors',
      credentials: 'omit'
    });

    if (!response.ok) throw new Error("Fallo al descargar el archivo de audio");
    
    await cache.put(track.preview, response); 
    
    await saveTrackOffline(track, isIndividual);
    
    return true;
  } catch (error) {
    console.error("Error en downloadTrack:", error);
    throw error;
  }
};