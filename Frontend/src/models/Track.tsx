import type { ColumnDef } from "@tanstack/react-table";
import { Timer } from "lucide-react";

interface Song {
  id: string;
  title: string;
  album?: string;
  artist: string;
  duration: string;
  image:string;
  preview:string;
}

export const columns: ColumnDef<Song>[] = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => (
      <img
        src={row.original.image}
        alt={row.original.title}
        className="w-10 h-10 rounded-md object-contain"
      />
    )
  },
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "artist",
    header: "Artista",
  },
  {
    accessorKey: "album",
    header: "Álbum",
  },
  {
    accessorKey: "duration",
    header: () => <Timer/>,
  },
];


export const columnsMin: ColumnDef<Song>[] = [
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "artist",
    header: "Artista",
  },
  {
    accessorKey: "duration",
    header: "",
  },
];
