import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnResizeMode,
  type VisibilityState,
  type ColumnOrderState,
} from "@tanstack/react-table";
import { useState } from "react";

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  columnVisibility?: VisibilityState;
  columnOrder?: ColumnOrderState;
  columnResizeMode?: ColumnResizeMode;
}

export function DataTable<TData>({
  data,
  columns,
  columnVisibility = {},
  columnOrder = [],
  columnResizeMode = "onChange",
}: DataTableProps<TData>) {
  const [columnVisibilityState, setColumnVisibility] =
    useState<VisibilityState>(columnVisibility);
  const [columnOrderState, setColumnOrder] =
    useState<ColumnOrderState>(columnOrder);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility: columnVisibilityState,
      columnOrder: columnOrderState,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode,
  });

  return (
    <div className="w-full overflow-auto">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{
                    width: header.getSize(),
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`absolute right-0 top-0 h-full w-1 bg-gray-200 cursor-col-resize select-none touch-none ${
                      header.column.getIsResizing() ? "bg-blue-500" : ""
                    }`}
                  />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
