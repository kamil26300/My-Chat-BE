module.exports = [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": [
            "'self'",
            "http:",
            "https:",
            "ws:",
            "wss:",
            "localhost:*",
          ],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "http:",
            "https:",
            "localhost:*",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "http:",
            "https:",
            "localhost:*",
          ],
          upgradeInsecureRequests: null,
        },
      },
      cors: {
        enabled: true,
        origin: ["http://localhost:5173", "https://my-chat-mz9q.onrender.com"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
        headers: ["Content-Type", "Authorization", "Origin", "Accept"],
        keepHeaderOnError: true,
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
