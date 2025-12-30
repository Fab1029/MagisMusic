import { useQuery } from "@tanstack/react-query";
import { getPlayLists } from "@/services/playlists";

export const useUserPlaylists = (accessToken: string | null) => {
  return useQuery({
    queryKey: ["userPlaylists", accessToken],
    queryFn: () => getPlayLists(accessToken as string),
    staleTime: Infinity,
    gcTime: Infinity, 
    enabled: !!accessToken,
  });
};
