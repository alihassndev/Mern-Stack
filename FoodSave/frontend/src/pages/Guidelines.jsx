import { useState, useEffect } from "react";
import api from "../utils/axios";

const Guidelines = ({ showToast }) => {
  const [guidelines, setGuidelines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchGuidelines();
  }, []);

  const fetchGuidelines = async () => {
    try {
      setLoading(true);
      const response = await api.get("/guidelines");
      setGuidelines(response.data.data);
    } catch (err) {
      setError("Failed to load guidelines");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter guidelines based on search and category
  const filteredGuidelines = guidelines.filter((guideline) => {
    const matchesSearch =
      guideline.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guideline.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || guideline.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = [
    ...new Set(guidelines.map((g) => g.category).filter(Boolean)),
  ];

  const defaultGuidelines = [
    {
      title: "Food Safety Basics",
      content:
        "Always check expiration dates before donating food items. Ensure packaging is intact and hasn't been tampered with.",
      category: "safety",
      icon: "🛡️",
    },
    {
      title: "Storage Guidelines",
      content:
        "Store perishable items at proper temperatures before donation. Keep frozen items frozen and refrigerated items cold.",
      category: "storage",
      icon: "❄️",
    },
    {
      title: "Packaging Requirements",
      content:
        "Label all food items with ingredients when possible. Avoid donating homemade foods unless specifically requested.",
      category: "packaging",
      icon: "📦",
    },
    {
      title: "Health Department Compliance",
      content:
        "Follow local health department guidelines for food handling. Maintain proper hygiene during food preparation and packaging.",
      category: "compliance",
      icon: "🏥",
    },
    {
      title: "Donation Best Practices",
      content:
        "Donate food items that you would eat yourself. Consider the nutritional value and dietary restrictions of recipients.",
      category: "best-practices",
      icon: "⭐",
    },
    {
      title: "Transportation Guidelines",
      content:
        "Use insulated containers for temperature-sensitive items. Ensure quick delivery to maintain food quality and safety.",
      category: "transport",
      icon: "🚚",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading guidelines...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Error Loading Guidelines
            </h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={fetchGuidelines} className="btn btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-10 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold gradient-text mb-3">
              📋 Food Donation Guidelines
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Essential guidelines to ensure safe, effective, and impactful food
              donations. Follow these best practices to help those in need while
              maintaining food safety standards.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            {/* <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search guidelines..."
                className="input-field pl-10 pr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div> */}
            <select
              className="input-field md:w-48"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Guidelines Content */}
        {filteredGuidelines.length === 0 && guidelines.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">
              No Custom Guidelines Yet
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Custom guidelines will be added by administrators. In the
              meantime, please refer to our essential food safety tips below.
            </p>
          </div>
        ) : filteredGuidelines.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No guidelines match your search
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or category filter.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {filteredGuidelines.map((guideline) => (
              <div
                key={guideline._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-200 transition-all duration-300 overflow-hidden group"
              >
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6">
                  <h3 className="text-xl font-semibold flex items-center">
                    <span className="mr-3 text-2xl">📋</span>
                    {guideline.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed mb-4">
                    {guideline.content}
                  </p>
                  {guideline.category && (
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 border border-primary-200">
                        <span className="mr-1">🏷️</span>
                        {guideline.category.charAt(0).toUpperCase() +
                          guideline.category.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(guideline.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Essential Food Safety Tips */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center justify-center">
              <span className="mr-3 text-3xl">🛡️</span>
              Essential Food Safety Guidelines
            </h2>
            <p className="text-gray-600">
              Core principles every food donor should follow to ensure safe and
              effective donations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {defaultGuidelines.map((guideline, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:border-primary-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">{guideline.icon}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {guideline.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {guideline.content}
                    </p>
                    <div className="mt-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {guideline.category.replace("-", " ").toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">
            Ready to Make a Difference?
          </h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Now that you understand our guidelines, you're ready to start
            donating food safely and effectively. Every donation counts in the
            fight against food waste and hunger.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donations"
              className="btn bg-white text-primary-700 hover:bg-gray-50 font-semibold px-8 py-3"
            >
              View Available Donations
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
