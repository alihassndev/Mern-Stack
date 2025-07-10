import { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { SearchInput } from "../ui/SearchInput";
import { FilterSelect } from "../ui/FilterSelect";
import {
  MapPinIcon,
  ClockIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

const donations = [
  {
    id: "1",
    donor: "Green Restaurant",
    foodName: "Vegetable Curry",
    foodType: "Prepared Meals",
    quantity: 15,
    distance: "0.5 miles",
    expiry: "Today",
    description:
      "Freshly made vegetable curry with rice. Packed in containers.",
    allergens: "Contains gluten",
  },
  {
    id: "2",
    donor: "Central Bakery",
    foodName: "Bread & Pastries",
    foodType: "Bakery Items",
    quantity: 30,
    distance: "1.2 miles",
    expiry: "Tomorrow",
    description: "Assorted bread and pastries from today's baking.",
    allergens: "Contains dairy, eggs",
  },
  {
    id: "3",
    foodName: "Mixed Fruits",
    foodType: "Fruits",
    quantity: 20,
    distance: "0.8 miles",
    expiry: "2 days",
    description: "Seasonal fruits including apples, bananas, and oranges.",
    allergens: "None",
  },
];

const foodTypes = [
  { value: "all", label: "All Types" },
  { value: "meals", label: "Prepared Meals" },
  { value: "bakery", label: "Bakery Items" },
  { value: "fruits", label: "Fruits" },
  { value: "vegetables", label: "Vegetables" },
];

export default function AvailableDonations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDonation, setSelectedDonation] = useState<string | null>(null);

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      donation.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.donor?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "all" ||
      donation.foodType.toLowerCase().includes(selectedType);
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-lg font-medium text-gray-900">
          Available Donations
        </h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search donations..."
          />
          <FilterSelect
            options={foodTypes}
            value={selectedType}
            onChange={setSelectedType}
          />
        </div>
      </div>

      {filteredDonations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No donations found matching your criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDonations.map((donation) => (
            <DonationCard
              key={donation.id}
              donation={donation}
              onViewDetails={() => setSelectedDonation(donation.id)}
            />
          ))}
        </div>
      )}

      {selectedDonation && (
        <DonationDetailsModal
          donation={donations.find((d) => d.id === selectedDonation)!}
          onClose={() => setSelectedDonation(null)}
        />
      )}
    </div>
  );
}

function DonationCard({
  donation,
  onViewDetails,
}: {
  donation: any;
  onViewDetails: () => void;
}) {
  return (
    <Card>
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900">{donation.foodName}</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {donation.foodType}
          </span>
        </div>

        {donation.donor && (
          <p className="text-sm text-gray-600">From {donation.donor}</p>
        )}

        <div className="flex items-center text-sm text-gray-500">
          <MapPinIcon className="h-4 w-4 mr-1" />
          {donation.distance} away
        </div>

        <div className="flex justify-between text-sm">
          <div className="flex items-center text-gray-500">
            <CalendarIcon className="h-4 w-4 mr-1" />
            Expires {donation.expiry}
          </div>
          <div className="font-medium">{donation.quantity} servings</div>
        </div>

        <div className="pt-2 border-t">
          <Button onClick={onViewDetails} className="w-full" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}

function DonationDetailsModal({
  donation,
  onClose,
}: {
  donation: any;
  onClose: () => void;
}) {
  const [requestMessage, setRequestMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Request submitted:", {
        donationId: donation.id,
        message: requestMessage,
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

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

          {donation.donor && (
            <p className="mt-1 text-sm text-gray-600">From {donation.donor}</p>
          )}

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-sm">
              <MapPinIcon className="h-5 w-5 mr-2 text-gray-400" />
              <span>{donation.distance} away</span>
            </div>
            <div className="flex items-center text-sm">
              <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" />
              <span>Expires {donation.expiry}</span>
            </div>
            <div className="flex items-center text-sm">
              <ClockIcon className="h-5 w-5 mr-2 text-gray-400" />
              <span>{donation.quantity} servings available</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="w-5 h-5 mr-2">🍽️</span>
              <span>{donation.foodType}</span>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900">Description</h4>
            <p className="mt-1 text-sm text-gray-600">{donation.description}</p>
          </div>

          {donation.allergens && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900">Allergens</h4>
              <p className="mt-1 text-sm text-gray-600">{donation.allergens}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="request-message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Request Message (optional)
              </label>
              <textarea
                id="request-message"
                rows={3}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Request Pickup"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
