const BASE_URL = "/api/v1/playlists"

export const postPlayList = async (accessToken:string, name: string) => {
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ name }),
        });

        if (!response.ok) {
            throw new Error("Error creating playlist");
        }

        const data = await response.json();
        return data;
    }catch (error) {
        throw error;
    }
}

export const updatePlayList = async (accessToken:string, playlistId:number, name: string) => {
    try {
        const response = await fetch(`${BASE_URL}/${playlistId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ name }),
        });

        if (!response.ok) {
            throw new Error("Error updating playlist");
        }

        const data = await response.json();
        return data;
    }catch (error) {
        throw error;
    }
}

export const deleteTrackFromPlaylist = async (accessToken:string, playlistId:number, trackId:number) => {
    try {
        const response = await fetch(`${BASE_URL}/${playlistId}/tracks/${trackId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });


        if (!response.ok) {
            throw new Error("Error deleting track from playlist");
        }

        const data = await response.json();
        return data;
    }catch (error) {
        throw error;
    }
}

export const deletePlaylist = async (accessToken:string, playlistId:number) => {
    try {
        const response = await fetch(`${BASE_URL}/${playlistId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });


        if (!response.ok) {
            throw new Error("Error deleting track from playlist");
        }

        const data = await response.json();
        return data;
    }catch (error) {
        throw error;
    }
}

export const getPlayLists = async (accessToken:string) => {
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });


        if (!response.ok) {
            throw new Error("Error fetching playlists");
        }

        const data = await response.json();
        return data;
    }catch (error) {
        throw error;
    }
}

export const getPlayListByID = async (accessToken:string, playlistId: string) => {
    try {
        const response = await fetch(`${BASE_URL}/${playlistId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });


        if (!response.ok) {
            throw new Error("Error fetching playlist by ID");
        }

        const data = await response.json();
        return data;
    }catch (error) {
        throw error;
    }
}

export const addTracksToPlayList = async (accessToken:string, playlistId: string, tracks: number[]) => {
    try {

        const response = await fetch(`${BASE_URL}/${playlistId}/tracks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ tracks }),
        });


        if (!response.ok) {
            throw new Error("Error adding tracks to playlist");
        }

        const data = await response.json();
        return data;
    }catch (error) {
        throw error;
    }
}