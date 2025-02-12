'use strict';

/**
 * message controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::message.message', ({ strapi }) => ({
  async find(ctx) {
    // Get the query parameters
    const { query } = ctx;

    // Call the default find method
    const { data, meta } = await super.find(ctx);

    // Return the response
    return { data, meta };
  },

  async create(ctx) {
    // Get the user from the context
    const user = ctx.state.user;

    // Add the user ID to the request body
    ctx.request.body.data = {
      ...ctx.request.body.data,
      user: user.id,
      timestamp: new Date(),
    };

    // Call the default create method
    const response = await super.create(ctx);

    return response;
  },
}));