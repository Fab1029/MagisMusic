import icons from "@/constants/icons";
import { CustomTable } from "./CustomTable";
import { useLocation } from "react-router-dom";
import { filters } from "@/store/useSearchStore";
import { getAlbumById, getArtistById, getPlayListById, getTrackById } from "@/services/deezer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CustomTableSkeleton from "./CustomTableSkeleton";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useJamStore } from "@/store/useJamStore";
import { errorToast, infoToast, successToast } from "./CustomSonner";
import { columns, columnsMobile } from "./Columns";
import { useIsMobile } from "@/hooks/useIsMobile";
import { getIsLikeResource, toogleResourceLike } from "@/services/resources";
import { useAuth } from "@/providers/authProvider";
import { CustomDropdownMenu } from "./CustomDropdownMenu";
import { addTracksToPlayList, getPlayLists } from "@/services/playlists";

function ContentView() {
  const isMobile = useIsMobile();
  const { idJam } = useJamStore();
  const pathName = useLocation().pathname;
  
  const filter = pathName.split('/')[3];
  const id = Number(pathName.split('/')[2]);
  const { replaceQueue } = usePlayerStore();
  
  const queryClient = useQueryClient();
  const { isLoggedIn, accessToken } = useAuth();
  

  const filterToSourceType = () => {
    switch (filter) {
      case filters[1]:
        return 'track';
      case filters[2]:
        return 'artist';
      case filters[3]:
        return 'album';
      case filters[4]:
        return 'playlist';
      default:
        return '';
    }
  }

  const handleQuery = () => {
    switch (filter) {
      case filters[1]:
        return  getTrackById(id);
      case filters[2]:
        return  getArtistById(id);
      case filters[3]:
        return  getAlbumById(id);
      case filters[4]:
        return  getPlayListById(id);
      default:
        return [];
    }
  };

  

  const {data: content, isLoading: isLoadingContent} = useQuery({
    queryKey: ["dataContentView", filter, id],
    queryFn: () => handleQuery(),
    refetchOnReconnect: true,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  const {data: likedStatus} = useQuery({
    queryKey: ['likedStatus', filter, id],
    queryFn: () => getIsLikeResource(filterToSourceType() as "track" | "album" | "artist" | "playlist", id, accessToken || ''),
    enabled: !!content && !!accessToken,
    refetchOnReconnect: true,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  const {data: playLists, isLoading: isPlayListsLoading} = useQuery({
    queryKey: ['playLists'],
    queryFn: () => getPlayLists(accessToken!),
    enabled: isLoggedIn && !!accessToken,
    staleTime: Infinity,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  const likeMutation = useMutation({
    mutationFn: () =>
      toogleResourceLike(
        filterToSourceType() as "track" | "album" | "artist" | "playlist",
        id,
        accessToken!
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['likedStatus', filter, id],
      });
    },
  });

  const handlePlayButton = () => {
    if (idJam)
      errorToast(
        'No se puede reproducir en este momento',
        'Cierra el Jam actual para reproducir tus canciones'
      );
    else {
      const tracks = content.tracks?.map((item:any) => ({...item})) || [content];
      replaceQueue(tracks); 
    }
    
  };

  const handleLikeStatus = () => {
    if (!isLoggedIn) {
      infoToast(
        'Acción no permitida',
        'Debes iniciar sesión para dar me gusta'
      );
      return;
    };
    likeMutation.mutate();
  };

  const isLiked = (isLoggedIn && likedStatus);

  const menuItems = [
    {
      label: 'Añadir a Playlist',
      subItems: 
        (isPlayListsLoading || !playLists)
        ? [{label: "Cargando..."}]
        : playLists.map((playlist:any) => ({
              label: playlist.name,
              onClick: async () => {
                try {
                  await addTracksToPlayList(accessToken || '', playlist.id_playlist, getTracksById());
                  successToast(
                    'Exito',
                    `Canciones añadida a la playlist ${playlist.name}.`
                  )
                } catch (error) {
                  errorToast(
                    'Error',
                    `No se pudo añadir la canción a la playlist ${playlist.name}.`
                  )
                }
                
              }
          }))
    }
  ];

  const getTracksById = () => {
    switch (filter) {
      case filters[1]:
        return [content.id];

      case filters[2]: 
      case filters[3]: 
      case filters[4]: 
        return content.tracks.map((track: any) => track.id);

      default:
        return [];
    }
  };

  return (
    <div>
      <div className="p-3 md:p-5 relative">

        <div className="bg-primary mask-b-from-gray-50 absolute inset-0 z-0 rounded-t-md" />

        <div className="gap-2 flex flex-col relative z-1 items-start md:flex-row md:items-end-safe md:gap-10">
          {(!isLoadingContent && content) ? (
            <img
              className="w-64 h-64 rounded-md"
              src={content.image}
            />
          ): (
            <Skeleton className="w-64 h-64 rounded-md"/>
          )}
          
          <div className="gap-2 flex flex-col md:gap-5">
            {(!isLoadingContent && content) ? (
              <>
                <h1 className="font-bold text-white truncate text-4xl max-w-70 md:text-7xl md:max-w-xl">{content.title || content.name}</h1>
                <h3 className="font-bold text-accent-foreground text-xl truncate max-w-70 md:text-2xl md:max-w-xl">{content.artist || content.description || 'Artista'}</h3>
              </>
            ): (
              <>
                <Skeleton className="h-10 w-60 md:h-15"/>
                <Skeleton className="h-8 w-30 md:h-10"/>
              </>
            )}
            
          </div>
        </div>

        <div className="mt-6 flex gap-4 relative z-1 items-center">
          <Button
            onClick={handlePlayButton} 
            className="
              flex items-center justify-center 
              bg-primary rounded-full w-14 h-14 p-1
              transition-all duration-200 ease-out
              hover:scale-114 cursor-pointer
            "
          >
            <img 
              className="w-7 h-7 object-contain" 
              src={icons.playIcon}
              alt="Play"
            />
          </Button>
          
          <Button
            onClick={handleLikeStatus}
            disabled={likeMutation.isPending}
            variant="pill" className="p-0 rounded-full bg-transparent hover:bg-transparent hover:scale-110"
          >
            <img 
              src={isLiked ? icons.likeIcon : icons.unlikeIcon} 
              className="w-8 h-8 object-contain" alt="Like item"
            />
          </Button>
          
          {isLoggedIn && (
            <CustomDropdownMenu
              trigger={
                <Button variant="pill" className="p-0 rounded-full bg-transparent hover:bg-transparent hover:scale-105">
                  <img src={icons.moreIcon} className="w-10 h-10 object-contain" alt="Like item"/>
                </Button>
              }
              menuItems={menuItems}
            />
          )}
          
          
        </div>
      </div>
      {(!isLoadingContent && content) ? (
        <CustomTable columns={isMobile ? columnsMobile : columns} data={content.tracks?.map((item:any) => ({...item})) || [content]}
        />
      ): (
        <CustomTableSkeleton rowsNumber={3}/>
      )}
    </div>
  );
}

export default ContentView;
