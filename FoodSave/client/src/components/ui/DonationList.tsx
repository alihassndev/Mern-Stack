import { useState } from "react";
import { Table } from "../ui/Table";
import { Badge } from "./Badge";
import { Button } from "../ui/Button";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";

const donations = [
  {
    id: "1",
    foodName: "Fresh Apples",
    foodType: "Fruits",
    quantity: 20,
    expiryDate: "2023-12-15",
    status: "available",
    requests: 3,
  },
  {
    id: "2",
    foodName: "Vegetable Curry",
    foodType: "Prepared Meals",
    quantity: 15,
    expiryDate: "2023-12-10",
    status: "reserved",
    requests: 1,
  },
  {
    id: "3",
    foodName: "Bread & Pastries",
    foodType: "Bakery Items",
    quantity: 30,
    expiryDate: "2023-12-08",
    status: "collected",
    requests: 0,
  },
];

const statusColors = {
  available: "green",
  reserved: "blue",
  collected: "gray",
  expired: "red",
};

export default function DonationList() {
  const [selectedDonation, setSelectedDonation] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Your Donations</h2>
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
          "Type",
          "Quantity",
          "Expiry",
          "Status",
          "Requests",
          "Actions",
        ]}
        data={donations.map((donation) => ({
          Food: donation.foodName,
          Type: donation.foodType,
          Quantity: donation.quantity,
          Expiry: new Date(donation.expiryDate).toLocaleDateString(),
          Status: (
            <Badge color={statusColors[donation.status]}>
              {donation.status.charAt(0).toUpperCase() +
                donation.status.slice(1)}
            </Badge>
          ),
          Requests: donation.requests,
          Actions: (
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDonation(donation.id)}
              >
                <EyeIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <PencilIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <TrashIcon className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ),
        }))}
      />

      {selectedDonation && (
        <DonationDetails
          donation={donations.find((d) => d.id === selectedDonation)!}
          onClose={() => setSelectedDonation(null)}
        />
      )}
    </div>
  );
}

function DonationDetails({
  donation,
  onClose,
}: {
  donation: any;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-gray-900">
              {donation.foodName}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>×
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Food Type</p>
              <p className="mt-1 text-sm text-gray-900">{donation.foodType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Quantity</p>
              <p className="mt-1 text-sm text-gray-900">
                {donation.quantity} servings
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Expiry Date</p>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(donation.expiryDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="mt-1 text-sm text-gray-900">
                <Badge color={statusColors[donation.status]}>
                  {donation.status.charAt(0).toUpperCase() +
                    donation.status.slice(1)}
                </Badge>
              </p>
            </div>
          </div>

          {donation.requests > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Requests ({donation.requests})
              </h4>
              <div className="space-y-3">
                {Array.from({ length: donation.requests }).map((_, i) => (
                  <div key={i} className="border rounded-lg p-3">
                    <div className="flex justify-between">
                      <p className="font-medium">Food Bank #{i + 1}</p>
                      <Badge color="blue">Pending</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Requested 2 days ago
                    </p>
                    <div className="mt-2 flex space-x-2">
                      <Button size="sm">Approve</Button>
                      <Button variant="secondary" size="sm">
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
