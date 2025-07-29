import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isAdminTabActive = (tab) => {
    return location.pathname === '/admin' && location.search.includes(`tab=${tab}`);
  };

  // Regular navigation links (for non-admin users)
  const navLinks = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/donations", label: "Donations", icon: "🍽️" },
    ...(user?.role === "ngo" ? [{ path: "/pickups", label: "Pickups", icon: "🚚" }] : []),
    { path: "/guidelines", label: "Guidelines", icon: "📋" },
  ];

  // Admin navigation links with tab parameters
  const adminNavLinks = [
    { path: "/admin?tab=users", label: "Users", icon: "👥", tab: "users" },
    { path: "/admin?tab=donations", label: "Donations", icon: "🍽️", tab: "donations" },
    { path: "/admin?tab=pickups", label: "Pickups", icon: "🚚", tab: "pickups" },
    { path: "/admin?tab=guidelines", label: "Guidelines", icon: "📋", tab: "guidelines" },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to={user?.role === "admin" ? "/admin?tab=users" : "/"} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                FoodSave
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {/* Show admin navigation for admin users, regular navigation for others */}
              {user?.role === "admin" ? (
                adminNavLinks.map((link) => (
                  <Link
                    key={link.tab}
                    to={link.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      isAdminTabActive(link.tab)
                        ? "bg-purple-50 text-purple-700 border border-purple-200"
                        : "text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                    }`}
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                ))
              ) : (
                navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      isActive(link.path)
                        ? "bg-primary-50 text-primary-700 border border-primary-200"
                        : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive("/profile")
                        ? "bg-primary-50 text-primary-700 border border-primary-200"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-700 font-medium text-sm">
                        {user.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span>{user.username}</span>
                    {user.role === "admin" && (
                      <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full font-medium">
                        Admin
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-primary text-sm"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-2">
            {/* Show appropriate navigation based on user role */}
            {user?.role === "admin" ? (
              adminNavLinks.map((link) => (
                <Link
                  key={link.tab}
                  to={link.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isAdminTabActive(link.tab)
                      ? "bg-purple-50 text-purple-700"
                      : "text-purple-600 hover:bg-purple-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))
            ) : (
              navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))
            )}

            <div className="pt-3 border-t border-gray-200 space-y-2">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive("/profile")
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-700 font-medium text-xs">
                        {user.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span>Profile</span>
                    {user.role === "admin" && (
                      <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full font-medium">
                        Admin
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>🔑</span>
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>✨</span>
                    <span>Get Started</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
