import { useState, useEffect } from "react";
import api from "../utils/axios";

const Guidelines = () => {
  const [guidelines, setGuidelines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuidelines = async () => {
      try {
        const response = await api.get("/guidelines");
        setGuidelines(response.data.data);
      } catch (err) {
        setError("Failed to load guidelines");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuidelines();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto bg-red-100 p-4 rounded-md text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Food Donation Guidelines</h1>

        {guidelines.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No guidelines available</h3>
            <p className="text-gray-600">
              Guidelines will be added soon.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {guidelines.map((guideline) => (
              <div key={guideline._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-primary-700 text-white p-4">
                  <h3 className="text-xl font-semibold">{guideline.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 whitespace-pre-line">{guideline.content}</p>
                  {guideline.category && (
                    <div className="mt-4">
                      <span className="inline-block bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
                        {guideline.category}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">General Food Safety Tips</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Always check expiration dates before donating food items</li>
            <li>Ensure packaging is intact and hasn't been tampered with</li>
            <li>Store perishable items at proper temperatures before donation</li>
            <li>Avoid donating homemade foods unless specifically requested</li>
            <li>Label all food items with ingredients when possible</li>
            <li>Follow local health department guidelines for food handling</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;