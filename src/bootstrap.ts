"use strict";

module.exports = async ({ strapi }) => {
  // Initialize socket.io
  const io = require("socket.io")(strapi.server.httpServer, {
    cors: {
      origin: "http://localhost:5173", // Your frontend URL
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization", "Content-Type", "Origin", "Accept"],
      credentials: true,
    },
    allowEIO3: true, // Enable Socket.IO v3 compatibility
    transports: ["websocket", "polling"],
  });

  // Store the socket instance in strapi
  strapi.io = io;

  // Socket.io authentication middleware
  io.use(async (socket, next) => {
    try {
      const token =
        socket.handshake.auth.token ||
        socket.handshake.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        return next(new Error("Authentication token missing"));
      }

      const verified =
        await strapi.plugins["users-permissions"].services.jwt.verify(token);
      const user = await strapi.plugins[
        "users-permissions"
      ].services.user.fetch(verified.id);

      if (!user) {
        return next(new Error("User not found"));
      }

      socket.user = user;
      next();
    } catch (err) {
      console.error("WebSocket authentication error:", err);
      next(new Error("Authentication failed"));
    }
  });

  // Handle socket connections
  io.on("connection", (socket) => {
    console.log("User connected:", socket.user.username);

    // Handle new messages
    socket.on("sendMessage", async (messageData) => {
      try {
        // Create message in database
        const message = await strapi.entityService.create(
          "api::message.message",
          {
            data: {
              content: messageData.content,
              user: socket.user.id,
              timestamp: new Date(),
              publishedAt: new Date(),
            },
          }
        );

        // Fetch the created message with user data
        const populatedMessage = await strapi.entityService.findOne(
          "api::message.message",
          message.id,
          {
            populate: ["user"],
          }
        );

        // Emit message to all clients
        io.emit("message", {
          id: populatedMessage.id,
          content: populatedMessage.content,
          username: socket.user.username,
          timestamp: populatedMessage.timestamp,
        });
      } catch (error) {
        console.error("Error saving message:", error);
        socket.emit("error", "Failed to save message");
      }
    });

    // Handle errors
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.user.username);
    });
  });
};
