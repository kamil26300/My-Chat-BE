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
  ],
};
