module.exports = [
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: false,
      cors: {
        enabled: true,
        headers: "*",
        origin: ["https://my-chat-mz9q.onrender.com", "http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
        credentials: true,
        maxAge: 86400,
      },
    },
  },
  "strapi::errors",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
