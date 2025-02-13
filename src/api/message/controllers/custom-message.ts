'use strict';

module.exports = {
  async findBySessionAndUser(ctx) {
    const { sessionId, userId } = ctx.query;
    try {
      const messages = await strapi.db.query('api::message.message').findMany({
        where: {
          sessionId: sessionId,
          userId: parseInt(userId)
        },
        orderBy: { timestamp: 'asc' },
      });

      return messages;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};