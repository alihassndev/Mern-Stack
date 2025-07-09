import { Card } from "./Card";

export function StatsCard({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) {
  return (
    <Card>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-gray-500">{change}</p>
    </Card>
  );
}
