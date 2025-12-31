import type { Track } from "@/models/Track";
import type { ColumnDef } from "@tanstack/react-table";
import { Timer } from "lucide-react";
import { CustomDropdownMenu } from "./CustomDropdownMenu";
import { Button } from "./ui/button";
import icons from "@/constants/icons";
import { useJamStore } from "@/store/useJamStore";
import { useLocation, useNavigate } from "react-router-dom";
import { filters } from "@/store/useSearchStore";
import { useAuth } from "@/providers/authProvider";
import { errorToast, infoToast, successToast } from "./CustomSonner";
import { getSearchArtistsByQuery } from "@/services/deezer";
import { getPlayLists } from "@/services/playlists";
import { useQuery } from "@tanstack/react-query";
import { useDeleteTrackFromPlaylist, useAddTrackToPlaylist } from "@/hooks/useUserPlaylists";
import { usePlaylistStore } from "@/store/usePlaylistStore";

const OptionCell = ({ row }: { row: { original: Track } }) => {
  const { idJam, socket } = useJamStore();
  const { pathname } = useLocation();

  const locationPath = pathname.split('/')[1];
  const typePath = pathname.split('/')[3];

  const navigate = useNavigate();
  const { isLoggedIn, accessToken } = useAuth();

  const {data: playLists, isLoading: isPlayListsLoading} = useQuery({
    queryKey: ['playLists'],
    queryFn: () => getPlayLists(accessToken!),
    enabled: isLoggedIn && !!accessToken,
    staleTime: Infinity,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  const canShowArtist =
    locationPath === 'search' ||
    (locationPath === 'content' && [filters[1], filters[3], filters[4]].includes(typePath));

  const { playlists: storedPlaylists, currentPlaylistId } = usePlaylistStore();
  const { mutate: deleteTrack } = useDeleteTrackFromPlaylist(accessToken!);
  const { mutate: addTrackToPlaylist } = useAddTrackToPlaylist(accessToken!);

  const menuItems = [
    {
      key: 'playlist',
      show: ['content', 'search', 'jam'].includes(locationPath),
      item: 
        isLoggedIn ? {
          label: 'Añadir a Playlist',
          subItems: (isPlayListsLoading || !storedPlaylists)
          ? [{label: "Cargando..."}]
          : storedPlaylists.map((playlist:any) => ({
              label: playlist.name,
              onClick: async () => {
                console.log('lcick agg')
                const isAlreadyInPlaylist = playlist.tracks.some(
                  (track: Track) => track.id === row.original.id
                );

                if (isAlreadyInPlaylist) {
                  infoToast(
                    'Información',
                    `La canción ya está en la playlist ${playlist.name}.`
                  );
                  return; 
                }
                addTrackToPlaylist({ playlistId: playlist.id, trackId: Number(row.original.id) },
                  {
                    onSuccess: () => {
                      successToast(
                        'Éxito',
                        `Canción añadida a la playlist ${playlist.name}.`
                      )
                    },
                    onError: () => {
                      errorToast(
                        'Error',
                        `No se pudo añadir la canción a la playlist ${playlist.name}.`
                      )
                    }
                  }
                );
              }
          }))
        } : {
          label: 'Añadir a Playlist',
          onClick : () => infoToast(
            'Información',
            'Debes iniciar sesión para añadir canciones a una playlist.',
          )
        }
    },
    {
      key: 'artist',
      show: canShowArtist,
      item: {
        label: 'Ver Artista',
        onClick: async() => {
          const artist = await getSearchArtistsByQuery(row.original.artist);
          const artistID = artist[0].id;

          navigate(`/content/${artistID}/${filters[2]}`);
        },
      },
    },
    {
      key: 'deleteSongPlaylist',
      show: ['playlist'].includes(locationPath),
      item: {
        label: 'Eliminar de la playlist',
        onClick: async() => {
          console.log(`Eliminar de la playlist ${row.original.id}`)
          if (!currentPlaylistId) return;
          deleteTrack({ playlistId: currentPlaylistId!, trackId: Number(row.original.id) });
        },
      },
    },
  ]
    .filter(({ show }) => show)
    .map(({ item }) => item);


  if (idJam && socket?.connected) {
    menuItems.unshift({
      label: 'Agregar al Jam',
      onClick: () => {
        console.log(
          `Canción ${row.original.title} agregada al Jam ${idJam}`
        );

        socket.emit('jamEvent', {
          jamId: idJam,
          event: {
            type: 'ADD_SONG',
            data: row.original,
          },
        });
      },
    });
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <CustomDropdownMenu
        trigger={
          <Button
            variant="pill"
            className="p-0 rounded-full bg-transparent hover:bg-transparent hover:scale-110"
          >
            <img
              src={icons.moreIcon}
              className="w-6 h-6 object-contain"
              alt="More option"
            />
          </Button>
        }
        menuItems={menuItems}
      />
    </div>
  );
};

const TruncatedText = ({
  value,
  maxWidths ="max-w-[80px]",
}: {
  value: string;
  maxWidths?: string;
}) => (
  <span
    className={`block truncate ${maxWidths}`}
    title={value}
  >
    {value}
  </span>
);

export const columns: ColumnDef<Track>[] = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => (
      <img
        src={row.original.image}
        alt={row.original.title}
        className="w-10 h-10 rounded-md object-contain"
      />
    ),
  },
  {
    accessorKey: "title",
    header: "Título",
    cell: ({ getValue }) => (
      <TruncatedText value={getValue() as string} />
    ),
  },
  {
    accessorKey: "artist",
    header: "Artista",
    cell: ({ getValue }) => (
      <TruncatedText value={getValue() as string}
      />
    ),
  },
  {
    accessorKey: "album",
    header: "Álbum",
    cell: ({ getValue }) => (
      <TruncatedText value={getValue() as string}
      />
    ),
  },
  {
    accessorKey: "duration",
    header: () => <Timer />,
    cell: ({ getValue }) => <span>{getValue() as string}</span>,
  },
  {
    accessorKey: "options",
    header: "",
    cell: OptionCell,
  },
];


export const columnsMin: ColumnDef<Track>[] = [
  {
    accessorKey: "title",
    header: "Título",
    cell: ({ getValue }) => (
      <TruncatedText
        value={getValue() as string}
      />
    ),
  },
  {
    accessorKey: "artist",
    header: "Artista",
    cell: ({ getValue }) => (
      <TruncatedText
        value={getValue() as string}
      />
    ),
  },
  {
    accessorKey: "duration",
    header: "",
    cell: ({ getValue }) => <span>{getValue() as string}</span>,
  },
  {
    accessorKey: "options",
    header: "",
    cell: OptionCell,
  },
];


export const columnsMobile: ColumnDef<Track>[] = [
  {
    accessorKey: "title",
    header: "Título",
    cell: ({ getValue }) => (
      <TruncatedText
        value={getValue() as string}
      />
    ),
  },
  {
    accessorKey: "duration",
    header: () => <Timer />,
    cell: ({ getValue }) => <span>{getValue() as string}</span>,
  },
  {
    accessorKey: "options",
    header: "",
    cell: OptionCell
  },
];