"use strict";

module.exports = {
  async deleteSession(ctx) {
    const { sessionId } = ctx.params;
    console.log("Deleting session", sessionId);

    try {
      // Delete all messages for this session
      await strapi.db.query("api::session.session").delete({
        where: {
          sessionId: sessionId,
        },
      });

      return { success: true };
    } catch (error) {
      ctx.throw(500, "Error deleting session");
    }
  },
};
