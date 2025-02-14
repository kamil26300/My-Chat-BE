module.exports = [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:", "http:", "ws:", "wss:"],
          "img-src": ["'self'", "data:", "blob:", "https:", "http:"],
          "media-src": ["'self'", "data:", "blob:", "https:", "http:"],
          upgradeInsecureRequests: null,
        },
      },
      cors: {
        enabled: true,
        origin: ["https://my-chat-mz9q.onrender.com", "http://localhost:5173"], // Add your frontend URLs
        headers: ["*"], // Allow all headers
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
        keepHeaderOnError: true,
        credentials: true,
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
