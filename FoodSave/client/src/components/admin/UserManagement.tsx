import { DataTable } from "../ui/DataTable";
import { columns } from "./UserColumns";
import { Button } from "../ui/Button";
import { Plus } from "lucide-react";
import type { User } from "../../types/types";

const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    status: "approved",
    registrationDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Food Donor",
    email: "donor@example.com",
    role: "donor",
    status: "approved",
    registrationDate: "2023-02-20",
  },
  {
    id: "3",
    name: "NGO Member",
    email: "ngo@example.com",
    role: "ngo",
    status: "pending",
    registrationDate: "2023-03-10",
  },
];

export default function UserManagement() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">User Management</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={users}
        columnVisibility={{
          registrationDate: false,
        }}
      />
    </div>
  );
}
