import { useQuery } from "@tanstack/react-query";
import { getLikedResources } from "@/services/resources";
import { getArtistById } from "@/services/deezer";

export const useUserArtistsLiked = (accessToken: string) => {
  return useQuery({
    queryKey: ["user-artist-liked", accessToken],
    queryFn: async () => {
        //obtener id de los artistas con like
        const response = await getLikedResources('artist', accessToken!);
      
        const ids = response.data; // IDs: [123, 456]
        if (!ids || !Array.isArray(ids)) return [];

        // Info de cada artsita (Peticiones en paralelo)
        const artistsDetails = await Promise.all(
            ids.map((id: number) => getArtistById(id))
        );

        return artistsDetails;
    },
    staleTime: Infinity,
    gcTime: Infinity, 
    enabled: !!accessToken,
  });
};