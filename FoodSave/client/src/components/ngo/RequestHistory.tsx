import { Table } from "../ui/Table";

const requests = [
  {
    id: "1",
    foodType: "Fruits",
    quantity: 10,
    date: "2023-12-01",
    status: "Completed",
  },
  {
    id: "2",
    foodType: "Sandwiches",
    quantity: 25,
    date: "2023-12-05",
    status: "Pending",
  },
];

export default function RequestHistory() {
  return (
    <Table
      headers={["Food Type", "Quantity", "Date", "Status"]}
      data={requests.map((r) => ({
        "Food Type": r.foodType,
        Quantity: r.quantity,
        Date: new Date(r.date).toLocaleDateString(),
        Status: (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              r.status === "Completed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {r.status}
          </span>
        ),
      }))}
    />
  );
}
