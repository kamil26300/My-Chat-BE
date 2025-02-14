"use strict";

module.exports = {
  async deleteSessionMessages(ctx) {
    const { sessionId } = ctx.params;
    
    try {
      // Delete all messages for this session
      await strapi.db.query("api::message.message").deleteMany({
        where: {
          sessionId: sessionId,
        },
      });
      
      return { success: true };
    } catch (error) {
      ctx.throw(500, "Error deleting session messages");
    }
  },
  async findBySessionAndUser(ctx) {
    const { sessionId, userId } = ctx.query;
    try {
      const messages = await strapi.db.query("api::message.message").findMany({
        where: {
          sessionId: sessionId,
          userId: parseInt(userId),
          publishedAt: {
            $notNull: true, // Ensures publishedAt is NOT null
          },
        },
        orderBy: { timestamp: "asc" },
      });

      return messages;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
