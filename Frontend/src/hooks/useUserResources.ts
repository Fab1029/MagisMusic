import { useQuery } from "@tanstack/react-query";
import { getLikedResources } from "@/services/resources";
import { getArtistById } from "@/services/deezer";

/*
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
};*/

export const useUserArtistsLiked = (accessToken: string | null) => {
  return useQuery({
    queryKey: ["user-artist-liked", accessToken],
    queryFn: async () => {
      const response = await getLikedResources('artist', accessToken!);
      const ids = response.data; 

      if (!ids || ids.length === 0) return [];

      // HIDRATACIÓN LENTA
      const artistsDetails = await Promise.all(
        ids.map((id: number) => 
          getArtistById(id).catch(err => {
            console.error(`Error cargando artista ${id}:`, err);
            return null; // Si uno falla, no matamos toda la lista
          })
        )
      );

      return artistsDetails.filter(Boolean); // Quitamos los que fallaron (null)
    },
    staleTime: 1000 * 60 * 10, // 10 minutos de datos "frescos"
    retry: 1, // Solo reintentar una vez si falla el 500
    enabled: !!accessToken,
  });
};