"use strict";

module.exports = async ({ strapi }) => {
  const io = require("socket.io")(strapi.server.httpServer, {
    cors: {
      origin: ["https://my-chat-mz9q.onrender.com", "http://localhost:5173"],
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: [
        "Authorization",
        "Content-Type",
        "Origin",
        "Accept",
        "Access-Control-Allow-Origin",
      ],
      credentials: true,
      maxAge: 86400,
    },
    allowEIO3: true,
    transports: ["websocket", "polling"],
  });

  strapi.io = io;

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

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user.username);

    socket.on("sendMessage", async (messageData) => {
      try {
        console.log("Received message:", messageData);

        const savedMessage = await strapi.entityService.create(
          "api::message.message",
          {
            data: {
              ...messageData,
              publishedAt: new Date(),
            },
          }
        );

        socket.emit("message", {
          ...savedMessage,
          isServerReply: false,
        });

        console.log("User message saved and emitted:", savedMessage);

        setTimeout(async () => {
          try {
            const serverReply = await strapi.entityService.create(
              "api::message.message",
              {
                data: {
                  content: messageData.content,
                  sessionId: messageData.sessionId,
                  userId: messageData.userId,
                  timestamp: new Date().toISOString(),
                  isServerReply: true,
                  publishedAt: new Date(),
                },
              }
            );

            socket.emit("message", {
              ...serverReply,
              isServerReply: true,
            });

            console.log("Server reply saved and emitted:", serverReply);
          } catch (serverError) {
            console.error("Error saving server reply:", serverError);
          }
        }, 2000);
      } catch (error) {
        console.error("Error handling message:", error);
        socket.emit("error", "Failed to process message");
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
