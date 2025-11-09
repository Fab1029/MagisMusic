import { CustomDropdownMenu } from "@/components/CustomDropdownMenu";
import { Button } from "@/components/ui/button";
import icons from "@/constants/icons";
import type { ColumnDef } from "@tanstack/react-table";
import { Timer } from "lucide-react";

export interface Song {
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
  {
    accessorKey: "options",
    header: '' ,
    cell: () => (
      (
      <CustomDropdownMenu
        trigger={
          <Button variant="pill" className="p-0 rounded-full bg-transparent hover:bg-transparent hover:scale-110">
            <img src={icons.moreIcon} className="w-6 h-6 object-contain" alt="More option"/>
          </Button>
        }
        menuItems={[{label: 'Opcion 1'}]}
      />
    )
    )
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
  {
    accessorKey: "options",
    header: '' ,
    cell: () => (
      (
      <CustomDropdownMenu
        trigger={
          <Button variant="pill" className="p-0 rounded-full bg-transparent hover:bg-transparent hover:scale-110">
            <img src={icons.moreIcon} className="w-6 h-6 object-contain" alt="More option"/>
          </Button>
        }
        menuItems={[{label: 'Opcion 1'}]}
      />
    )
    )
  },
];
