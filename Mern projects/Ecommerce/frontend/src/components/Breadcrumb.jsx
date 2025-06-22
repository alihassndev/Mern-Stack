import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const getBreadcrumbName = (pathname) => {
    switch (pathname) {
      case "cart":
        return "Shopping Cart";
      case "orders":
        return "My Orders";
      case "profile":
        return "Profile";
      case "login":
        return "Login";
      case "register":
        return "Register";
      case "checkout":
        return "Checkout";
      case "admin":
        return "Admin";
      case "products":
        return "Products";
      default:
        return pathname.charAt(0).toUpperCase() + pathname.slice(1);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link
        to="/"
        className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>

      {pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={pathname} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {isLast ? (
              <span className="text-gray-900 font-medium">
                {getBreadcrumbName(pathname)}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-blue-600 transition-colors"
              >
                {getBreadcrumbName(pathname)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
