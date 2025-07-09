import { StatsCard } from "../ui/StatsCard";

export default function SystemStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard
        title="Total Donations"
        value="1,245"
        change="+12% this month"
      />
      <StatsCard title="Active NGOs" value="42" change="+3 new this week" />
      <StatsCard title="Food Saved (kg)" value="2,850" change="+320kg today" />
    </div>
  );
}
