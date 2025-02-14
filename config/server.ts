module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  url: "https://fresh-cow-6d97fb883c.strapiapp.com",
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
  cors: {
    enabled: true,
    origin: ["https://my-chat-mz9q.onrender.com", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    headers: ["Content-Type", "Authorization", "Origin", "Accept"],
    maxAge: 86400,
  },
});
