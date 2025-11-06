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
import { useState, useMemo } from "react";

interface DataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  showHeaders?: boolean;
}

export function CustomTable<TData extends object, TValue>({
  data,
  columns,
  showHeaders = true,
}: DataTableProps<TData, TValue>) {
  const [selectIndex, setSelectedIndex] = useState<number>();

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
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                onClick={() => setSelectedIndex(index)}
                className={`border-0 cursor-pointer transition-all duration-200 ease-in-out ${
                  selectIndex === index
                    ? "bg-card-foreground"
                    : "hover:bg-muted"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-4 max-w-1 truncate overflow-hidden whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
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
