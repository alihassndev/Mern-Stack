import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/axios";
import io from "socket.io-client";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const { user } = useAuth();
  const dropdownRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      fetchUnreadCount();
      setupWebSocket();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowDetails(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const setupWebSocket = () => {
    if (!user) return;

    socketRef.current = io(import.meta.env.VITE_API_URL.replace('/api/v1', ''));
    
    socketRef.current.on("connect", () => {
      socketRef.current.emit("join-user-room", user._id);
    });

    socketRef.current.on("new_notification", (notification) => {
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
      
      if (Notification.permission === "granted") {
        new Notification(notification.title, {
          body: notification.message,
          icon: "/favicon.ico",
        });
      }
    });
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get("/notifications?limit=10");
      setNotifications(response.data.data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await api.get("/notifications/unread-count");
      setUnreadCount(response.data.data.unreadCount);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await api.patch(`/notifications/${notificationId}/read`);
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.patch("/notifications/mark-all-read");
      setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id || notification._id);
    }
    
    // Show details for pickup-related notifications
    if (notification.type.includes('pickup')) {
      setSelectedNotification(notification);
      setShowDetails(true);
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      pickup_request: "🚚",
      pickup_accepted: "✅",
      pickup_rejected: "❌",
      pickup_completed: "📦",
      donation_expired: "⏰",
      system_announcement: "📢",
      feedback_received: "⭐",
    };
    return icons[type] || "🔔";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: "text-gray-500",
      medium: "text-blue-500",
      high: "text-orange-500",
      urgent: "text-red-500",
    };
    return colors[priority] || "text-gray-500";
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const notificationDate = new Date(date);
    const diffInMinutes = Math.floor((now - notificationDate) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  // Only show for donors
  if (!user || user.role !== 'donor') return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-full transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-5 5v-5zM4 19h10a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        
        {/* Notification Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Main Dropdown */}
      {isOpen && !showDetails && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-64 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mx-auto"></div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h10a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id || notification._id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !notification.isRead ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {notification.title}
                        </p>
                        <span className={`text-xs ${getPriorityColor(notification.priority)}`}>
                          ●
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      {/* Show sender info for pickup requests */}
                      {notification.type.includes('pickup') && notification.sender && (
                        <p className="text-xs text-blue-600 mt-1">
                          From: {notification.sender.username}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-400">
                          {formatTimeAgo(notification.createdAt)}
                        </p>
                        {notification.type.includes('pickup') && (
                          <span className="text-xs text-green-600 font-medium">
                            Click for details →
                          </span>
                        )}
                      </div>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200">
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
                className="w-full text-center text-sm text-green-600 hover:text-green-700 font-medium"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}

      {/* Detailed View for Pickup Notifications */}
      {showDetails && selectedNotification && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <button
              onClick={() => setShowDetails(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ← Back
            </button>
            <h3 className="text-lg font-semibold text-gray-900">Pickup Request Details</h3>
            <div></div>
          </div>

          {/* Detailed Content */}
          <div className="p-4 space-y-4">
            {/* Notification Info */}
            <div className="flex items-start space-x-3">
              <span className="text-3xl">
                {getNotificationIcon(selectedNotification.type)}
              </span>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{selectedNotification.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{selectedNotification.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatTimeAgo(selectedNotification.createdAt)}
                </p>
              </div>
            </div>

            {/* Sender Information */}
            {selectedNotification.sender && (
              <div className="bg-blue-50 rounded-lg p-3">
                <h5 className="font-medium text-blue-900 mb-2">👤 Request From:</h5>
                <div className="space-y-1">
                  <p className="text-sm"><span className="font-medium">Name:</span> {selectedNotification.sender.username}</p>
                  <p className="text-sm"><span className="font-medium">Email:</span> {selectedNotification.sender.email}</p>
                  <p className="text-sm"><span className="font-medium">Type:</span> NGO/Food Bank</p>
                </div>
              </div>
            )}

            {/* Donation Information */}
            {selectedNotification.data?.donationId && (
              <div className="bg-green-50 rounded-lg p-3">
                <h5 className="font-medium text-green-900 mb-2">🍽️ Donation Details:</h5>
                <div className="space-y-1">
                  <p className="text-sm"><span className="font-medium">Title:</span> {selectedNotification.data.donationId.title}</p>
                  <p className="text-sm"><span className="font-medium">Status:</span> Available for pickup</p>
                </div>
              </div>
            )}

            {/* Pickup Request Status */}
            {selectedNotification.data?.pickupRequestId && (
              <div className="bg-orange-50 rounded-lg p-3">
                <h5 className="font-medium text-orange-900 mb-2">🚚 Pickup Status:</h5>
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Status:</span> 
                    <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${
                      selectedNotification.data.pickupRequestId.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      selectedNotification.data.pickupRequestId.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      selectedNotification.data.pickupRequestId.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedNotification.data.pickupRequestId.status}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => {
                  // Navigate to donations page to see full details
                  window.location.href = '/donations';
                }}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                View Full Details
              </button>
              <button
                onClick={() => {
                  setShowDetails(false);
                  setIsOpen(false);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;