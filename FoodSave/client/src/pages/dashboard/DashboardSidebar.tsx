import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  GiftIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  role: "donor" | "ngo" | "admin";
}

export default function DashboardSidebar({ role }: SidebarProps) {
  const donorLinks = [
    { name: "Dashboard", to: "/dashboard", icon: HomeIcon },
    { name: "Donate Food", to: "/dashboard/donate", icon: GiftIcon },
    { name: "History", to: "/dashboard/history", icon: ChartBarIcon },
  ];

  const ngoLinks = [
    { name: "Dashboard", to: "/dashboard", icon: HomeIcon },
    { name: "Find Donations", to: "/dashboard/donations", icon: GiftIcon },
    { name: "Requests", to: "/dashboard/requests", icon: ChartBarIcon },
  ];

  const adminLinks = [
    { name: "Dashboard", to: "/dashboard", icon: HomeIcon },
    { name: "Users", to: "/dashboard/users", icon: UsersIcon },
    { name: "Analytics", to: "/dashboard/analytics", icon: ChartBarIcon },
  ];

  const links =
    role === "admin" ? adminLinks : role === "ngo" ? ngoLinks : donorLinks;

  return (
    <div className="hidden md:flex md:w-64 bg-white border-r">
      <div className="w-full py-4">
        <div className="px-4 mb-8">
          <h2 className="text-xl font-bold text-gray-800">FoodSave</h2>
          <p className="text-sm text-gray-500">{role} Dashboard</p>
        </div>

        <nav className="space-y-1 px-2">
          {links.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
