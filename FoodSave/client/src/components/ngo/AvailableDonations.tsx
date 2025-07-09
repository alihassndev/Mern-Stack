import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

const donations = [
  {
    id: "1",
    donor: "Green Restaurant",
    foodType: "Vegetable Curry",
    quantity: 15,
    distance: "0.5 miles",
    expiry: "Today",
  },
  {
    id: "2",
    donor: "Central Bakery",
    foodType: "Bread & Pastries",
    quantity: 30,
    distance: "1.2 miles",
    expiry: "Tomorrow",
  },
];

export default function AvailableDonations() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {donations.map((donation) => (
        <Card key={donation.id}>
          <h3 className="font-medium">{donation.donor}</h3>
          <p className="text-gray-600">{donation.foodType}</p>
          <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
            <div>
              <p className="text-gray-500">Quantity</p>
              <p>{donation.quantity} servings</p>
            </div>
            <div>
              <p className="text-gray-500">Distance</p>
              <p>{donation.distance}</p>
            </div>
            <div>
              <p className="text-gray-500">Expires</p>
              <p>{donation.expiry}</p>
            </div>
          </div>
          <Button size="sm" className="mt-4 w-full">
            Request Pickup
          </Button>
        </Card>
      ))}
    </div>
  );
}
