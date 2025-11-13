import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import type { ColumnDef } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useMemo } from "react";
import { useJamStore } from "@/store/useJamStore";
import { errorToast } from "./CustomSonner";
import type { Track } from "@/models/Track";
import { usePlayerStore } from "@/store/usePlayerStore";

interface CustomTableProps {
  data: Track[];
  columns: ColumnDef<Track, any>[];
  showHeaders?: boolean;
}

export function CustomTable({ data, columns, showHeaders = true }: CustomTableProps) {
  const { idJam, socket} = useJamStore();
  const { songs, currentSongIndex, replaceQueue } = usePlayerStore();

  const columnsWithId = useMemo<ColumnDef<Track, any>[]>(() => {
    const idColumn: ColumnDef<Track, any> = {
      id: "id_column",
      header: "#",
      cell: ({ row }) => row.index + 1,
    };
    return [idColumn, ...columns];
  }, [columns]);

  const table = useReactTable({
    data,
    columns: columnsWithId,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleOnClickRow = (index: number) => {
    /*
    if (idJam && socket?.connected) {
      socket.emit("jamEvent", {
        jamId: idJam,
        event: { type: "PLAY_SONG", index: index },
      });

      
    }
    else {
      replaceQueue(data, index);
    }*/

  };


  return (
    <div className="overflow-hidden rounded-md">
      <Table>
        {showHeaders && (
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
        )}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => {
              const song = row.original;
              const isSelected = song.id === songs[currentSongIndex]?.id;

              return (
                <TableRow
                  key={row.id}
                  onClick={() => handleOnClickRow(index)}
                  className={`border-0 cursor-pointer transition-all duration-200 ease-in-out ${
                    isSelected ? "bg-card-foreground" : "hover:bg-muted"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columnsWithId.length} className="h-24 text-center">
                No results
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
