const BASE_URL = "/api/jam"

export const createJam = async() => {
    try{
        const pathName = window.location.origin
        const response = await fetch(`${BASE_URL}/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (!response.ok) {
            throw new Error('Error al obtener crear Jam');            
        }

        let data =  await response.json();
     
        data.link = `${pathName}/jam/${data.jamId}`;
        return data;

    }catch(error) {
        throw new Error('Error al crear el Jam');
    }
};

