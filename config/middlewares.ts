export default [
  "strapi::errors",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      headers: "*",
      origin: ["https://my-chat-mz9q.onrender.com"],
    },
  },
  "strapi::security",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
