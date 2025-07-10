import { DataTable } from "@/components/ui/data-table";
import { pickupColumns } from "./PickupColumns";
import { Pickup } from "../../types/types";
import { Button } from "../ui/Button";

const pickups: Pickup[] = [
  {
    id: "1",
    donationName: "Vegetable Curry",
    donor: "Green Restaurant",
    ngo: "Food Bank NGO",
    status: "scheduled",
    pickupTime: "2023-12-05 14:00",
    driver: "John Doe",
  },
  // ... more pickups
];

export default function PickupManagement() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium">Manage Pickups</h2>
        <Button>Assign Driver</Button>
      </div>
      <DataTable columns={pickupColumns} data={pickups} />
    </div>
  );
}
