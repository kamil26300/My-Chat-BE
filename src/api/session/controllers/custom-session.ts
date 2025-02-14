"use strict";

module.exports = {
  async deleteSession(ctx) {
    const { sessionId } = ctx.params;

    try {
      // Delete all messages for this session
      await strapi.db.query("api::session.session").deleteMany({
        where: {
          sessionId: sessionId,
        },
      });

      return { success: true };
    } catch (error) {
      ctx.throw(500, "Error deleting session");
    }
  },
  async getSessionByUser(ctx) {
    const { userId } = ctx.query;

    try {
      const sessions = await strapi.db.query("api::session.session").findMany({
        where: {
          userId: parseInt(userId),
          publishedAt: {
            $notNull: true, // Ensures publishedAt is NOT null
          },
        },
        orderBy: { timestamp: "asc" },
      });
      

      return sessions;
    } catch (error) {
      ctx.throw(500, "Error finding session");
    }
  },
};
