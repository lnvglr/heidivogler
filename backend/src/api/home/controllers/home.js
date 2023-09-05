'use strict';

/**
 *  home controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::home.home', ({ strapi }) => ({
	async find(ctx) {
		const { query } = ctx;

		const entity = await strapi.entityService.findMany('api::home.home', {
			...query,
			populate: {
				heroImage: true,
				hero: true,
				offers: {
					populate: {
						copy: true,
						events: true,
						rank: true,
						hero: {
							populate: {
								image: true,
								vertical: true,
							}
						},
					},
				},
				content: {
					populate: {
						image: true,
						testimonial: {
							populate: {
								image: true,
							}
						}
					}
				},
			},
		});
		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	}
}));

