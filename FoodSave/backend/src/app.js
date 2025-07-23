import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import userRouter from "./routes/user.routes.js";
import foodDonationRouter from "./routes/foodDonation.routes.js";
import pickupRouter from "./routes/pickup.routes.js";
import guidelineRouter from "./routes/guideline.routes.js";
import feedbackRouter from "./routes/feedback.routes.js";

const app = express();
const httpServer = createServer(app);

// Socket.io setup
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

// Attach io to app for controller access
app.set("io", io);

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/donations", foodDonationRouter);
app.use("/api/v1/pickups", pickupRouter);
app.use("/api/v1/guidelines", guidelineRouter);
app.use("/api/v1/feedback", feedbackRouter);

// WebSocket events
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join room for specific pickup tracking
  socket.on("join-pickup-room", (requestId) => {
    socket.join(`pickup_${requestId}`);
    console.log(`Socket ${socket.id} joined pickup_${requestId}`);
  });

  // Handle location updates from drivers
  socket.on("driver-location-update", ({ requestId, coords }) => {
    io.to(`pickup_${requestId}`).emit("location-update", coords);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

export { httpServer };
