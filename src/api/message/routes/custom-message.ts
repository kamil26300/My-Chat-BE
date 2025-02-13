module.exports = {
  routes: [
    {
      method: "GET",
      path: "/messages/session",
      handler: "custom-message.findBySessionAndUser",
      config: {
        auth: false,
      },
    },
    {
      method: "DELETE",
      path: "/messages/session/:sessionId",
      handler: "custom-message.deleteSessionMessages",
      config: {
        auth: false,
      },
    },
  ],
};
