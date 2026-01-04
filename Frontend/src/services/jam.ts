const JAM_URL = import.meta.env.VITE_BACKEND_JAM_URL;
const BASE_URL = `${JAM_URL}/api/v1/jam/`

export const createJam = async(accessToken:string) => {
    try{
        const pathName = window.location.origin
        const response = await fetch(`${BASE_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          }
        });

        if (!response.ok) {
            throw new Error('Error al crear Jam');            
        }

        let data =  await response.json();
     
        data.link = `${pathName}/jam/${data.jamId}`;
        return data;

    }catch(error) {
        throw new Error('Error al crear el Jam');
    }
};

