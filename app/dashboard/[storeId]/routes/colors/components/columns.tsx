"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-actions"

export type ColorColumn = {
  id: string
  name: string
  value: string
  createdAt: string
}

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "value",
    header: "Cor",
    cell: ({ row }) => (
      <div className="items-center flex gap-x-2">
        {row.original.value}
        <div className="h-6 w-6 rounded-full border" style={{backgroundColor: row.original.value}}/>
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
