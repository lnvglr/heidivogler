'use strict';

/**
 *  about controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::about.about', ({ strapi }) => ({
	async find(ctx) {
		const { query } = ctx;

		const entity = await strapi.entityService.findMany('api::about.about', {
			...query,
			populate: {
				hero: {
					populate: {
						image: true,
					}
				},
				content: {
					populate: {
						image: true,
						tile: {
							iconPicker: true,
						}
					}
				},
			},
		});
		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	}
}));

