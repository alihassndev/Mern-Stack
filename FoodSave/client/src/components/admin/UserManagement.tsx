import { Table } from "../ui/Table";

const users = [
  {
    id: "1",
    name: "Green Restaurant",
    email: "green@example.com",
    role: "Donor",
    status: "Active",
  },
  {
    id: "2",
    name: "Food Bank NGO",
    email: "foodbank@example.com",
    role: "NGO",
    status: "Pending",
  },
];

export default function UserManagement() {
  return (
    <Table
      headers={["Name", "Email", "Role", "Status", "Actions"]}
      data={users.map((user) => ({
        Name: user.name,
        Email: user.email,
        Role: user.role,
        Status: (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              user.status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {user.status}
          </span>
        ),
        Actions: (
          <div className="space-x-2">
            <button className="text-blue-600 hover:underline">Edit</button>
            <button className="text-red-600 hover:underline">Delete</button>
          </div>
        ),
      }))}
    />
  );
}
