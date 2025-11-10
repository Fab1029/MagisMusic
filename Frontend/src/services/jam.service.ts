const BASE_URL = "/api/jam"

export const createJam = async() => {
    try{
        const response = await fetch(`${BASE_URL}/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (!response.ok) {
            throw new Error('Error al obtener crear Jam');            
        }

        return await response.json();

    }catch(error) {
        throw new Error('Error al crear el Jam');
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
