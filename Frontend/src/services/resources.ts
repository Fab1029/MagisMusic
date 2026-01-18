const BASE_URL = "/api-gateway/v1/resources/"


export const getIsLikeResource = async (
  type: "track" | "album" | "artist" | "playlist",
  idResource: number,
  accessToken: string
) => {
    try {
			const response = await fetch(`${BASE_URL}/${type}/${idResource}`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (!response.ok) {
				return false
			}

  		const data = await response.json();

			if (!data) {
				return false
			}

    	return data.isLike;
		}catch (error) {
			return false
    }
};

export const toogleResourceLike = async (
  type: "track" | "album" | "artist" | "playlist",
  id_resource: number,
  accessToken: string
) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        type,
        id_resource,
      }),
    });

    if (!response.ok) {
      throw new Error("Error posting resource");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    throw error;
  }
};

export const getLikedResources = async (
  type: "track" | "album" | "artist" | "playlist",
  accessToken: string
) => {
    try {
			const response = await fetch(`${BASE_URL}/liked/${type}`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (!response.ok) {
				return false
			}

  		const data = await response.json();

			if (!data) {
				return false
			}

    	return data;
		}catch (error) {
			return false
    }
};