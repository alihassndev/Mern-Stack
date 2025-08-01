import { Router } from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
} from "../controller/notification.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// All routes require authentication
router.use(verifyJWT);

router.route("/").get(getNotifications);
router.route("/unread-count").get(getUnreadCount);
router.route("/mark-all-read").patch(markAllAsRead);
router.route("/:notificationId/read").patch(markAsRead);
router.route("/:notificationId").delete(deleteNotification);

export default router;