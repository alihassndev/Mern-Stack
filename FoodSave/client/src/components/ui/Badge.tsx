interface BadgeProps {
  color: "green" | "blue" | "red" | "gray" | "yellow";
  children: React.ReactNode;
  className?: string;
}

const colorClasses = {
  green: "bg-green-100 text-green-800",
  blue: "bg-blue-100 text-blue-800",
  red: "bg-red-100 text-red-800",
  gray: "bg-gray-100 text-gray-800",
  yellow: "bg-yellow-100 text-yellow-800",
};

export function Badge({ color, children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]} ${className}`}
    >
      {children}
    </span>
  );
}
