"use strict";

module.exports = async ({ strapi }) => {
  const io = require("socket.io")(strapi.server.httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization", "Content-Type", "Origin", "Accept"],
      credentials: true,
    },
    allowEIO3: true,
    transports: ["websocket", "polling"],
  });

  strapi.io = io;

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || 
        socket.handshake.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        return next(new Error("Authentication token missing"));
      }

      const verified = await strapi.plugins["users-permissions"].services.jwt.verify(token);
      const user = await strapi.plugins["users-permissions"].services.user.fetch(verified.id);

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

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user.username);

    socket.on("sendMessage", async (messageData) => {
      console.log(messageData)
      try {
        // Create user message
        const userMessage = await strapi.entityService.create("api::message.message", {
          data: {
            content: messageData.content,
            userId: socket.user.id,
            sessionId: messageData.sessionId,
            timestamp: new Date(),
            publishedAt: new Date(),
            isServerReply: false
          },
        });

        // Create server reply (echo message)
        const serverReply = await strapi.entityService.create("api::message.message", {
          data: {
            content: messageData.content,
            userId: socket.user.id,
            sessionId: messageData.sessionId,
            timestamp: new Date(),
            publishedAt: new Date(),
            isServerReply: true
          },
        });

        // Emit both messages to the specific user
        socket.emit("message", {
          id: userMessage.id,
          content: userMessage.content,
          username: socket.user.username,
          timestamp: userMessage.timestamp,
          sessionId: messageData.sessionId,
          isServerReply: false
        });

        // Emit server reply after a short delay to simulate processing
        setTimeout(() => {
          socket.emit("message", {
            id: serverReply.id,
            content: serverReply.content,
            username: "Server",
            timestamp: serverReply.timestamp,
            sessionId: messageData.sessionId,
            isServerReply: true
          });
        }, 500);
      } catch (error) {
        console.error("Error saving message:", error);
        socket.emit("error", "Failed to save message");
      }
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.user.username);
    });
  });
};