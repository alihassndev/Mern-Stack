import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StatCard } from "../ui/StatCard";

const data = [
  { name: "Jan", donations: 400 },
  { name: "Feb", donations: 300 },
  // ... more months
];

export default function DonationReports() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Donations" value="1,245" />
        <StatCard title="Food Saved (kg)" value="2,850" />
        <StatCard title="Active NGOs" value="42" />
      </div>

      <div className="h-[400px] bg-white p-4 rounded-lg border">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="donations" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
