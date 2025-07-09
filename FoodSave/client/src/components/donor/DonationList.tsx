import { Table } from "../ui/Table";

const donations = [
  {
    id: "1",
    foodType: "Fruits",
    quantity: 20,
    expiryDate: "2023-12-15",
    status: "Available",
  },
  {
    id: "2",
    foodType: "Bakery",
    quantity: 15,
    expiryDate: "2023-12-10",
    status: "Claimed",
  },
];

export default function DonationList() {
  return (
    <Table
      headers={["Food Type", "Quantity", "Expiry Date", "Status"]}
      data={donations.map((d) => ({
        "Food Type": d.foodType,
        Quantity: d.quantity,
        "Expiry Date": new Date(d.expiryDate).toLocaleDateString(),
        Status: (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              d.status === "Available"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {d.status}
          </span>
        ),
      }))}
    />
  );
}
