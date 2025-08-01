import { asyncHandler } from "../utils/asyncHandler.js";
import { Notification } from "../model/notification.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a new notification
export const createNotification = async ({
  recipientId,
  senderId = null,
  type,
  title,
  message,
  data = {},
  priority = "medium"
}) => {
  try {
    const notification = await Notification.create({
      recipient: recipientId,
      sender: senderId,
      type,
      title,
      message,
      data,
      priority,
    });

    // Emit real-time notification via WebSocket
    const io = global.io;
    if (io) {
      io.to(`user_${recipientId}`).emit("new_notification", {
        id: notification._id,
        type,
        title,
        message,
        priority,
        createdAt: notification.createdAt,
      });
    }

    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};

// Get notifications for a user
export const getNotifications = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, unreadOnly = false } = req.query;
  const userId = req.user._id;

  const filter = { recipient: userId };
  if (unreadOnly === 'true') {
    filter.isRead = false;
  }

  const notifications = await Notification.find(filter)
    .populate("sender", "username email")
    .populate("data.donationId", "title")
    .populate("data.pickupRequestId", "status")
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const totalNotifications = await Notification.countDocuments(filter);
  const unreadCount = await Notification.countDocuments({
    recipient: userId,
    isRead: false,
  });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        notifications,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalNotifications / limit),
          totalNotifications,
          unreadCount,
        },
      },
      "Notifications retrieved successfully"
    )
  );
});

// Mark notification as read
export const markAsRead = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;
  const userId = req.user._id;

  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, recipient: userId },
    { isRead: true },
    { new: true }
  );

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  res.status(200).json(
    new ApiResponse(200, notification, "Notification marked as read")
  );
});

// Mark all notifications as read
export const markAllAsRead = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  await Notification.updateMany(
    { recipient: userId, isRead: false },
    { isRead: true }
  );

  res.status(200).json(
    new ApiResponse(200, {}, "All notifications marked as read")
  );
});

// Delete notification
export const deleteNotification = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;
  const userId = req.user._id;

  const notification = await Notification.findOneAndDelete({
    _id: notificationId,
    recipient: userId,
  });

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  res.status(200).json(
    new ApiResponse(200, {}, "Notification deleted successfully")
  );
});

// Get unread count
export const getUnreadCount = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const unreadCount = await Notification.countDocuments({
    recipient: userId,
    isRead: false,
  });

  res.status(200).json(
    new ApiResponse(200, { unreadCount }, "Unread count retrieved")
  );
});