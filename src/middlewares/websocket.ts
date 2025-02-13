module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    if (!strapi.io) {
      const io = require("socket.io")(strapi.server.httpServer, {
        cors: {
          origin: "http://localhost:5173",
          methods: ["GET", "POST"],
          allowedHeaders: ["Authorization"],
          credentials: true,
        },
      });

      // Authentication middleware
      io.use(async (socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
          return next(new Error("Authentication token missing"));
        }

        try {
          const verified =
            await strapi.plugins["users-permissions"].services.jwt.verify(
              token
            );
          const user = await strapi.plugins[
            "users-permissions"
          ].services.user.fetch(verified.id);
          socket.user = user;
          next();
        } catch (err) {
          next(new Error("Authentication failed"));
        }
      });

      io.on("connection", (socket) => {
        console.log("User connected:", socket.user.username);

        // Handle new message
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

            // Emit message to all clients
            io.emit("message", {
              id: message.id,
              content: message.content,
              username: socket.user.username,
              timestamp: message.timestamp,
            });
          } catch (error) {
            console.error("Error saving message:", error);
            socket.emit("error", "Failed to save message");
          }
        });

        socket.on("disconnect", () => {
          console.log("User disconnected:", socket.user.username);
        });
      });

      strapi.io = io;
    }
    await next();
  };
};
