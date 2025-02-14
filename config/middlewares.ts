module.exports = {
  settings: {
    cors: {
      enabled: true,
      origin: ['https://my-chat-mz9q.onrender.com'],
      headers: ['Content-Type', 'Authorization', 'X-Frame-Options'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      credentials: true,
    },
  },
};
