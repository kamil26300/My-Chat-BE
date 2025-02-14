module.exports = {
  routes: [
    {
      method: "DELETE",
      path: "/sessions/:sessionId",
      handler: "custom-session.deleteSession",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/sessions",
      handler: "custom-session.getSessionByUser",
      config: {
        auth: false,
      },
    },
  ],
};
