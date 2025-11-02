export const BASE_ERROR = {
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

const BASE_URL = 'https://api.deezer.com/';

export const DeezerRepository  = {

    async getChartTracks (limit = 10)  {
        try{
            const response= await fetch(`${BASE_URL}/chart/0/tracks?limit=${limit}`);
            const data = await response.json();

            if(data.error) {
                const message = BASE_ERROR[data.error.code] || "Unknown Deezer API Error";
                throw new Error(`Chart Repository Error: ${message}`);
            }
            
            const tracks = data.data.map((item) => (
                {
                    id: item.id,
                    title: item.title,
                    duration: item.duration,
                    preview: item.preview,
                    album: item.album.title,
                    image: item.album.cover,
                }
            ));

            return tracks;
        }catch(error) {
            throw new Error(`Deezer Repository Error: ${error}`);
        }        
    }


}