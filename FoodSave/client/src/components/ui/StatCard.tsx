interface StatCardProps {
  title: string;
  value: string;
  change?: string;
}

export function StatCard({ title, value, change }: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg border">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      {change && <p className="text-sm text-gray-500">{change}</p>}
    </div>
  );
}
