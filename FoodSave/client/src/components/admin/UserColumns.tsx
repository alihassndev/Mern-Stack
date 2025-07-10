import { type ColumnDef } from "@tanstack/react-table";
import type { User } from "../../types/types";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    size: 200,
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 250,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant={row.original.role === "admin" ? "default" : "secondary"}>
        {row.original.role}
      </Badge>
    ),
    size: 120,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "approved" ? "success" : "warning"}
      >
        {row.original.status}
      </Badge>
    ),
    size: 120,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit User</DropdownMenuItem>
          <DropdownMenuItem>
            {row.original.status === "approved" ? "Revoke" : "Approve"} Access
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    size: 50,
  },
];
