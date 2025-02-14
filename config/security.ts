module.exports = {
  cors: {
    enabled: true,
    origin: "https://my-chat-mz9q.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    headers: ["Content-Type", "Authorization", "Origin", "Accept"],
    keepHeaderOnError: true,
  },
  csrf: {
    enabled: false,
  },
};
