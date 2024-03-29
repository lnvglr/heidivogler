'use strict';

/**
 *  event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ({ strapi }) => ({

	async find(ctx) {
		const { query } = ctx;

		let entity = (await strapi.entityService.findMany('api::event.event', {
			...query,
			populate: {
				offer: true,
				canRegister: true,
			}
		}))

		// if (query?.filters.start.$contains === 'future') {
		// 	entity = entity.filter((e) => {
		// 		(new Date(e.start).getTime() > (new Date).getTime() || new Date(e.end).getTime() > (new Date).getTime())
		// 	});
		// }
		if (query?.sort === 'start') {
			entity = entity.sort((a, b) => (a.start > b.start) ? 1 : -1);
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	}
}));
