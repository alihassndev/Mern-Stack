import { ReactNode } from "react";

interface DashboardCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function DashboardCard({
  title,
  children,
  className = "",
}: DashboardCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      {title && (
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
