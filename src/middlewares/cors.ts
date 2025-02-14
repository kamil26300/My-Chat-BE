module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.method === "OPTIONS") {
      ctx.status = 200;
      ctx.set(
        "Access-Control-Allow-Origin",
        "https://my-chat-mz9q.onrender.com"
      );
      ctx.set(
        "Access-Control-Allow-Methods",
        "GET,OPTIONS,PATCH,DELETE,POST,PUT"
      );
      ctx.set(
        "Access-Control-Allow-Headers",
        "Content-Type,Authorization,Origin,Accept"
      );
      ctx.set("Access-Control-Allow-Credentials", "true");
      ctx.set("Access-Control-Max-Age", "86400");
      return;
    }
    await next();
  };
};
