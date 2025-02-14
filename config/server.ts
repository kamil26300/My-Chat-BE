module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  url: env("PUBLIC_URL", "http://localhost:1337"),
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
  cors: {
    enabled: true,
    origin: ["http://localhost:5173", "https://my-chat-mz9q.onrender.com/"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    headers: ["Content-Type", "Authorization", "Origin", "Accept"],
  },
});
