import { useMutation, useQuery } from "@tanstack/react-query";
import { getPlayLists } from "@/services/playlists";
import { useQueryClient } from "@tanstack/react-query";
import { postPlayList, updatePlayList, deletePlaylist, deleteTrackFromPlaylist, addTracksToPlayList } from "@/services/playlists";
import { errorToast, successToast } from "@/components/CustomSonner";
import { usePlaylistStore } from "@/store/usePlaylistStore";

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
    onSuccess: (newPlaylist) => {
      const normalizedPlaylist = {
        id: newPlaylist.id,
        name: newPlaylist.name,
        tracks: [] 
      };
      // Actualizar la cache
      queryClient.setQueryData(["userPlaylists", accessToken], (oldData: any) => {
        return oldData ? [...oldData, normalizedPlaylist] : [normalizedPlaylist];
      });

      successToast("Éxito", `Playlist "${newPlaylist.name}" creada correctamente.`);
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
  const {playlists, setPlaylists} = usePlaylistStore();

  return useMutation({
    mutationFn: ({playlistId, name}: {playlistId:number, name:string}) => updatePlayList(accessToken, playlistId, name),
    onSuccess: (updatedPlaylist, variables) => {
      const { playlistId } = variables;

      //actualizar cache
      queryClient.setQueryData(["userPlaylists", accessToken], (oldData: any) => {
        if (!oldData) return oldData;
        return oldData.map((pl: any) =>
          pl.id === playlistId ? { ...pl, name: updatedPlaylist.name } : pl
        );
      });
      //actualizar store
      setPlaylists(
        playlists.map(pl =>
          pl.id === updatedPlaylist.id ? { ...pl, name: updatedPlaylist.name } : pl
        )
      );
    },
    onError: () => {
      errorToast(
        'Error',
        'No se pudo modificar la playlist. Intentalo de nuevo'
      )
    }
  })
}

export const useDeletePlaylist = (accessToken: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (playlistId:number) => deletePlaylist(accessToken, playlistId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userPlaylists", accessToken]
      })
      successToast(
        'Playlist eliminada',
        `La playlist ha sido eliminada con éxito`
      )
    },
    onError: () => {
      errorToast(
        'Error',
        'No se pudo eliminar la playlist. Intentalo de nuevo'
      )
    }
  })
}

export const useDeleteTrackFromPlaylist = (accessToken: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({playlistId, trackId}: {playlistId:number, trackId:number}) => deleteTrackFromPlaylist(accessToken, playlistId, trackId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userPlaylists", accessToken]
      })
      successToast(
        'Canción eliminada',
        `La canción ha sido eliminada de la playlist`
      )
    },
    onError: () => {
      errorToast(
        'Error',
        'No se pudo crear eliminar la canción de la playlist. Intentalo de nuevo'
      )
    }
  })
}

export const useAddTrackToPlaylist = (accessToken: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({playlistId, trackId}: {playlistId:number, trackId:number}) => addTracksToPlayList(accessToken, playlistId, [trackId]),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userPlaylists", accessToken]
      })
    }
  })
}