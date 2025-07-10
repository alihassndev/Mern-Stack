import { Table } from "./ui/Table";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { ClockIcon, CheckIcon, XIcon } from "@heroicons/react/24/outline";

const requests = [
  {
    id: "1",
    foodName: "Vegetable Curry",
    donor: "Green Restaurant",
    quantity: 15,
    date: "2023-12-01",
    status: "completed",
    scheduledPickup: "2023-12-02 14:00",
  },
  {
    id: "2",
    foodName: "Bread & Pastries",
    donor: "Central Bakery",
    quantity: 20,
    date: "2023-12-05",
    status: "scheduled",
    scheduledPickup: "2023-12-06 11:00",
  },
  {
    id: "3",
    foodName: "Mixed Fruits",
    donor: "Local Market",
    quantity: 25,
    date: "2023-12-07",
    status: "pending",
    scheduledPickup: null,
  },
];

const statusColors = {
  pending: "yellow",
  scheduled: "blue",
  completed: "green",
  cancelled: "red",
};

export default function RequestHistory() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Your Requests</h2>
        <div className="flex space-x-2">
          <Button variant="secondary" size="sm">
            Filter
          </Button>
          <Button variant="secondary" size="sm">
            Sort
          </Button>
        </div>
      </div>

      <Table
        headers={[
          "Food",
          "Donor",
          "Quantity",
          "Date",
          "Status",
          "Pickup",
          "Actions",
        ]}
        data={requests.map((request) => ({
          Food: request.foodName,
          Donor: request.donor,
          Quantity: request.quantity,
          Date: new Date(request.date).toLocaleDateString(),
          Status: (
            <Badge color={statusColors[request.status]}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </Badge>
          ),
          Pickup: request.scheduledPickup
            ? new Date(request.scheduledPickup).toLocaleString()
            : "Not scheduled",
          Actions: (
            <div className="flex space-x-2">
              {request.status === "pending" && (
                <>
                  <Button variant="ghost" size="sm">
                    <CheckIcon className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <XIcon className="h-4 w-4 text-red-600" />
                  </Button>
                </>
              )}
              <Button variant="ghost" size="sm">
                <ClockIcon className="h-4 w-4" />
              </Button>
            </div>
          ),
        }))}
      />
    </div>
  );
}
