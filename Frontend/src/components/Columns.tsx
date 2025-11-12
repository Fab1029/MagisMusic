import type { Track } from "@/models/Track";
import type { ColumnDef } from "@tanstack/react-table";
import { Timer } from "lucide-react";
import { CustomDropdownMenu } from "./CustomDropdownMenu";
import { Button } from "./ui/button";
import icons from "@/constants/icons";
import { useJamStore } from "@/store/useJamStore";


const OptionCell = ({ row }: { row: { original: Track } }) => {
  const { idJam, socket, addSongToQueue } = useJamStore();

  const baseMenuItems = [
    { label: 'Añadir a Playlist', onClick: () => console.log('Añadir a Playlist') },
    { label: 'Ver Artista', onClick: () => console.log('Ver Artista') },
  ];
    
  if (idJam && socket?.connected) {
    baseMenuItems.unshift({ 
      label: 'Agregar al Jam', 
      onClick: () => {
        console.log(`Canción ${row.original.title} agregada al Jam ${idJam}`);
  
        socket.emit("jamEvent", { 
          jamId: idJam, 
          event: { type: "ADD_SONG", data: row.original } 
        });

        addSongToQueue(row.original); 
      } 
    });
  }

  return (
    <CustomDropdownMenu
      trigger={
        <Button 
          variant="pill" 
          className="p-0 rounded-full bg-transparent hover:bg-transparent hover:scale-110"
        >
          <img src={icons.moreIcon} className="w-6 h-6 object-contain" alt="More option"/>
        </Button>
      }
      menuItems={baseMenuItems}
    />
  );
}

const TruncatedText = ({
  value,
  maxWidths = "max-w-[120px] sm:max-w-[220px] md:max-w-[300px]",
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
      <TruncatedText
        value={getValue() as string}
        maxWidths="max-w-[160px] sm:max-w-[200px]"
      />
    ),
  },
  {
    accessorKey: "album",
    header: "Álbum",
    cell: ({ getValue }) => (
      <TruncatedText
        value={getValue() as string}
        maxWidths="max-w-[200px] sm:max-w-[260px]"
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
        maxWidths="max-w-[160px] sm:max-w-[200px]"
      />
    ),
  },
  {
    accessorKey: "artist",
    header: "Artista",
    cell: ({ getValue }) => (
      <TruncatedText
        value={getValue() as string}
        maxWidths="max-w-[140px] sm:max-w-[180px]"
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
        maxWidths="max-w-[120px] sm:max-w-[160px]"
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
    cell: () => (
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
        menuItems={[{ label: "Opción 1" }]}
      />
    ),
  },
];