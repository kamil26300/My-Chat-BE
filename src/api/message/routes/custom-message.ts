module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/messages/session',
      handler: 'custom-message.findBySessionAndUser',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};