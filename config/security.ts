module.exports = {
  cors: {
    enabled: true,
    origin: ['http://localhost:65173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    keepHeaderOnError: true,
  },
  csrf: {
    enabled: false,
  },
};