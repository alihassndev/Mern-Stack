import React, { useState, useEffect } from 'react';
import api from '../utils/axios';
import FeedbackCard from '../components/FeedbackCard';
import { useAuth } from '../context/AuthContext';

const MyFeedback = ({ showToast }) => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, averageRating: 0 });
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'donor') {
      fetchMyFeedback();
    }
  }, [user]);

  const fetchMyFeedback = async () => {
    try {
      setLoading(true);
      const response = await api.get('/feedback/donor/my-feedback');
      const feedbackData = response.data.data;
      setFeedback(feedbackData);
      
      // Calculate stats
      if (feedbackData.length > 0) {
        const avgRating = feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length;
        setStats({
          total: feedbackData.length,
          averageRating: avgRating.toFixed(1)
        });
      }
    } catch (err) {
      console.error('Failed to fetch feedback:', err);
      showToast('Failed to load feedback', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'donor') {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-gray-600">This page is only available for donors.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading feedback...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📝 Feedback on My Donations
          </h1>
          <p className="text-gray-600">
            See what NGOs think about your food donations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Feedback</p>
                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <span className="text-2xl">⭐</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.averageRating || 'N/A'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Impact Score</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.total > 0 ? 'Excellent' : 'Getting Started'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback List */}
        {feedback.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No feedback yet
            </h3>
            <p className="text-gray-600">
              Complete some donations to start receiving feedback from NGOs!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedback.map((item) => (
              <FeedbackCard key={item._id} feedback={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFeedback;