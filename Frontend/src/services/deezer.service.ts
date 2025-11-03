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
        const response = await fetch(`${BASE_URL}/search/tracks?q=${query}`);

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
        const response = await fetch(`${BASE_URL}/search/albumns?q=${query}`);

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
        const response = await fetch(`${BASE_URL}/search/playlists?q=${query}`);

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
        const response = await fetch(`${BASE_URL}/search/artists?q=${query}`);

        if (!response.ok) {
            throw new Error('Error al obtener artistas por busqueda');            
        }

        return await response.json();

    }catch(error) {
        throw new Error('Error al obtener artistas por busqueda');    
    }
};

