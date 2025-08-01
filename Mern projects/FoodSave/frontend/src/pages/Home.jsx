import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MapComponent from "../components/MapComponent";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="pt-16"> {/* Add padding-top to account for fixed navbar */}
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Reducing Food Waste, Feeding Communities</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">FoodSave connects food donors with NGOs to ensure excess food reaches those who need it most.</p>
          
          {!user ? (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup" className="btn bg-white text-primary-700 hover:bg-gray-100 font-medium text-lg px-8 py-3 rounded-lg">
                Join Now
              </Link>
              <Link to="/signin" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-700 font-medium text-lg px-8 py-3 rounded-lg">
                Sign In
              </Link>
            </div>
          ) : (
            <div className="flex justify-center">
              <Link to={user.role === "donor" ? "/donations/new" : "/donations"} className="btn bg-white text-primary-700 hover:bg-gray-100 font-medium text-lg px-8 py-3 rounded-lg">
                {user.role === "donor" ? "Donate Food" : "Browse Donations"}
              </Link>
            </div>
          )}
        
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How FoodSave Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-700 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">List Your Donation</h3>
              <p className="text-gray-600">Restaurants, grocery stores, and individuals can list their excess food with details like quantity and expiry date.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-700 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">NGOs Request Pickup</h3>
              <p className="text-gray-600">Local NGOs and food banks can browse available donations and request pickup at convenient times.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-700 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Track & Complete</h3>
              <p className="text-gray-600">Real-time tracking ensures smooth pickup and delivery, with confirmation when food reaches its destination.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-16 px-4 bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Our Impact</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <p className="text-xl">Food Donations</p>
            </div>
            
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <p className="text-xl">Partner NGOs</p>
            </div>
            
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <p className="text-xl">Meals Delivered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-gray-600">Join our community of donors and NGOs working together to reduce food waste and fight hunger.</p>
          
          {!user ? (
            <Link to="/signup" className="btn btn-primary text-lg px-8 py-3 rounded-lg">
              Get Started Today
            </Link>
          ) : (
            <Link to={user.role === "donor" ? "/donations/new" : "/donations"} className="btn btn-primary text-lg px-8 py-3 rounded-lg">
              {user.role === "donor" ? "Donate Now" : "Find Donations"}
            </Link>
          )}
          
        </div>
      </section>
    </div>
  );
};

export default Home;
