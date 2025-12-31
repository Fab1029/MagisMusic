import { useMutation, useQuery } from "@tanstack/react-query";
import { getPlayLists } from "@/services/playlists";
import { useQueryClient } from "@tanstack/react-query";
import { postPlayList, updatePlayList } from "@/services/playlists";
import { errorToast } from "@/components/CustomSonner";

export const useUserPlaylists = (accessToken: string | null) => {
  return useQuery({
    queryKey: ["userPlaylists", accessToken],
    queryFn: () => getPlayLists(accessToken as string),
    staleTime: Infinity,
    gcTime: Infinity, 
    enabled: !!accessToken,
  });
};

export const useCreatePlaylist = (accessToken: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name:string) => postPlayList(accessToken, name),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userPlaylists", accessToken]
      })
    },
    onError: () => {
      errorToast(
        'Error',
        'No se pudo crear la playlist. Intentalo de nuevo'
      )
    }
  })
}

export const useUpdatePlaylist = (accessToken: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({playlistId, name}: {playlistId:number, name:string}) => updatePlayList(accessToken, playlistId, name),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userPlaylists", accessToken]
      })
    },
    onError: () => {
      errorToast(
        'Error',
        'No se pudo crear la playlist. Intentalo de nuevo'
      )
    }
  })
}