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

interface Identifiable {
    id: string;
}

interface DataTableProps<TData extends Identifiable, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  showHeaders?: boolean;
  onRowClick: (row: TData, index: number) => void;
  selectedSongId?: string | null;
}

export function CustomTable<TData extends Identifiable, TValue>({
  data,
  columns,
  showHeaders = true,
  onRowClick,
  selectedSongId = null,
}: DataTableProps<TData, TValue>) {
  
  const { idJam } = useJamStore();

  const columnsWithId = useMemo<ColumnDef<TData, any>[]>(() => {
    const idColumn: ColumnDef<TData, any> = {
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
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
              const isSelected = song.id === selectedSongId;
              return (
                  <TableRow
                    key={row.id}
                    onClick={() => {
                      if (idJam)
                        errorToast(
                          'No se puede reproducir en este momento',
                          'Cierra el Jam actual para reproducir tus canciones'
                        );
                      else
                        onRowClick(song, index)
                    }}
                    className={`border-0 cursor-pointer transition-all duration-200 ease-in-out ${
                    isSelected
                    ? "bg-card-foreground"
                    : "hover:bg-muted"
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
