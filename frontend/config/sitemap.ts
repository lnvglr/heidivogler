import { Offer } from '~/types'
import { Strapi4ResponseMany } from '@nuxtjs/strapi/dist/runtime/types'
import fetch from 'node-fetch'
const apiBase = process.env.API_BASE || 'http://localhost:1337'

export default {
	// provide dynamic URLs to be included
	urls: async () => {
		const res = await fetch(`${apiBase}/api/offers`)
		const { data } = (await res.json() as Strapi4ResponseMany<Offer>)
		return (data).map((offer) => ({
			loc: `/angebot/${offer.attributes.slug}`,
			lastmod: offer.attributes.updatedAt,
			changefreq: 'daily',
			priority: 0.8,
		}))
	},
}
