export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "donor" | "ngo";
  status: "pending" | "approved" | "rejected";
  registrationDate: string;
};

export type Pickup = {
  id: string;
  donationName: string;
  donor: string;
  ngo: string;
  status: "pending" | "scheduled" | "completed" | "cancelled";
  pickupTime: string;
  driver?: string;
};
