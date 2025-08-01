import React, { useState, useEffect } from 'react';
import api from '../utils/axios';

const DonorProfileModal = ({ isOpen, onClose, donorId, donorName }) => {
  const [profile, setProfile] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isOpen && donorId) {
      fetchDonorProfile();
      fetchDonorFeedback();
    }
  }, [isOpen, donorId]);

  const fetchDonorProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/feedback/donor/${donorId}/profile`);
      setProfile(response.data.data);
    } catch (err) {
      console.error('Failed to fetch donor profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDonorFeedback = async () => {
    try {
      const response = await api.get(`/feedback/donor/${donorId}`);
      setFeedback(response.data.data.feedback);
    } catch (err) {
      console.error('Failed to fetch donor feedback:', err);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ⭐
      </span>
    ));
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-yellow-600';
    if (rating >= 2.5) return 'text-orange-600';
    return 'text-red-600';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{donorName || 'Donor Profile'}</h2>
              <p className="text-green-100">Donor Reliability & Feedback</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading donor profile...</p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 font-medium ${
                  activeTab === 'overview'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                📊 Overview
              </button>
              <button
                onClick={() => setActiveTab('feedback')}
                className={`px-6 py-3 font-medium ${
                  activeTab === 'feedback'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                💬 Feedback ({feedback.length})
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'overview' && profile && (
                <div className="space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {profile.stats.totalDonations}
                      </div>
                      <div className="text-sm text-blue-600">Total Donations</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {profile.stats.completedDonations}
                      </div>
                      <div className="text-sm text-green-600">Completed</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                      <div className={`text-2xl font-bold ${getRatingColor(profile.stats.averageRating)}`}>
                        {profile.stats.averageRating || 'N/A'}
                      </div>
                      <div className="text-sm text-yellow-600">Avg Rating</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {profile.stats.totalFeedback}
                      </div>
                      <div className="text-sm text-purple-600">Reviews</div>
                    </div>
                  </div>

                  {/* Donor Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3">Donor Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Email:</span>
                        <span className="ml-2 font-medium">{profile.donor.email}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Phone:</span>
                        <span className="ml-2 font-medium">{profile.donor.phone || 'Not provided'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Member Since:</span>
                        <span className="ml-2 font-medium">
                          {new Date(profile.stats.memberSince).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Success Rate:</span>
                        <span className="ml-2 font-medium text-green-600">
                          {profile.stats.totalDonations > 0 
                            ? Math.round((profile.stats.completedDonations / profile.stats.totalDonations) * 100)
                            : 0}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Feedback Preview */}
                  {profile.recentFeedback && profile.recentFeedback.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Recent Feedback</h3>
                      <div className="space-y-3">
                        {profile.recentFeedback.map((item, index) => (
                          <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">{renderStars(item.rating)}</div>
                              <span className="text-sm text-gray-600">({item.rating}/5)</span>
                            </div>
                            {item.comment && (
                              <p className="text-gray-700 text-sm italic">"{item.comment}"</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'feedback' && (
                <div className="space-y-4">
                  {feedback.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">💬</div>
                      <p className="text-gray-600">No feedback available for this donor yet.</p>
                    </div>
                  ) : (
                    feedback.map((item, index) => (
                      <div key={index} className="bg-white border border-gray-200 p-6 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-gray-800">
                              {item.pickupRequest?.donation?.title || 'Donation'}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">{renderStars(item.rating)}</div>
                              <span className="text-sm text-gray-600">({item.rating}/5)</span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        {item.comment && (
                          <p className="text-gray-700 italic mb-3">"{item.comment}"</p>
                        )}
                        <div className="text-sm text-gray-600">
                          <span>Reviewed by: </span>
                          <span className="font-medium text-green-600">
                            {item.ngo?.username || 'NGO'}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorProfileModal;