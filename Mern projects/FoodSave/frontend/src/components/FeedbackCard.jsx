import React from 'react';

const FeedbackCard = ({ feedback, showDonationTitle = true }) => {
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      {showDonationTitle && feedback.pickupRequest?.donation && (
        <h3 className="font-semibold text-lg text-gray-800 mb-2">
          {feedback.pickupRequest.donation.title}
        </h3>
      )}
      
      <div className="flex items-center gap-2 mb-3">
        <div className="flex">{renderStars(feedback.rating)}</div>
        <span className="text-sm text-gray-600">({feedback.rating}/5)</span>
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm text-gray-600">From:</span>
        <span className="font-medium text-green-600">
          {feedback.ngo?.username || 'NGO'}
        </span>
      </div>
      
      {feedback.comment && (
        <p className="text-gray-700 mb-3 italic">
          "{feedback.comment}"
        </p>
      )}
      
      <div className="text-xs text-gray-500">
        {new Date(feedback.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default FeedbackCard;