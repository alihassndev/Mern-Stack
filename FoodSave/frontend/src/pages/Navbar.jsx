import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-primary-700 text-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold">FoodSave</Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md hover:bg-primary-600 transition-colors">
                Home
              </Link>
              <Link to="/donations" className="px-3 py-2 rounded-md hover:bg-primary-600 transition-colors">
                Donations
              </Link>
              {user?.role === "ngo" && (
                <Link to="/pickups" className="px-3 py-2 rounded-md hover:bg-primary-600 transition-colors">
                  Pickups
                </Link>
              )}
              <Link to="/guidelines" className="px-3 py-2 rounded-md hover:bg-primary-600 transition-colors">
                Guidelines
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm">{user.username}</span>
                  <button 
                    onClick={logout}
                    className="bg-primary-800 px-4 py-2 rounded-lg hover:bg-primary-900 transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signin" className="px-3 py-2 rounded-md hover:bg-primary-600 transition-colors">
                    Login
                  </Link>
                  <Link to="/signup" className="bg-primary-800 px-4 py-2 rounded-lg hover:bg-primary-900 transition-all duration-300">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-primary-600 focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary-800 pb-3 pt-2">
          <div className="px-2 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md hover:bg-primary-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/donations" 
              className="block px-3 py-2 rounded-md hover:bg-primary-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Donations
            </Link>
            {user?.role === "ngo" && (
              <Link 
                to="/pickups" 
                className="block px-3 py-2 rounded-md hover:bg-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pickups
              </Link>
            )}
            <Link 
              to="/guidelines" 
              className="block px-3 py-2 rounded-md hover:bg-primary-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Guidelines
            </Link>
            
            <div className="pt-4 border-t border-primary-600">
              {user ? (
                <>
                  <span className="block px-3 py-2 text-primary-200">{user.username}</span>
                  <button 
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md hover:bg-primary-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/signin" 
                    className="block px-3 py-2 rounded-md hover:bg-primary-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block px-3 py-2 rounded-md hover:bg-primary-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
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
