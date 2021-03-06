'use strict';

/**
 *  offer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::offer.offer', ({ strapi }) => ({
	async find(ctx) {
		const { query } = ctx;

		const entity = await strapi.entityService.findMany('api::offer.offer', {
			...query,
			populate: {
				copy: true,
				events: true,
				hero: {
					populate: {
						image: true,
					}
				},
				content: {
					populate: {
						image: true,
					}
				},
			},
		});
		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	}
}));

