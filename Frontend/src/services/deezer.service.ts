const BASE_URL = "/api/deezer"

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
        const response = await fetch(`${BASE_URL}/albumns?limit=${limit}`);

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
            throw new Error('Error al obtener albumes populares');            
        }

        return await response.json();

    }catch(error) {
        throw new Error('Error al obtener albumes populares');
    }
};

export const getMostPopularArtists = async(limit = 10) => {
    try{
        const response = await fetch(`${BASE_URL}/artists?limit=${limit}`);

        if (!response.ok) {
            throw new Error('Error al obtener albumes populares');            
        }

        return await response.json();

    }catch(error) {
        throw new Error('Error al obtener albumes populares');
    }
};