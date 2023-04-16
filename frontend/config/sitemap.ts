import { Offer } from '~/types'
import { Strapi4ResponseMany } from '@nuxtjs/strapi/dist/runtime/types'
import fetch from 'node-fetch'
const siteUrl = process.env.API_BASE || 'http://localhost:1337'

export default {
	// provide dynamic URLs to be included
	siteUrl,
	urls: async () => {
		try {
			const res = await fetch(`${siteUrl}/api/offers`)
			const { data } = (await res.json() as Strapi4ResponseMany<Offer>)
			return (data).map((offer) => ({
				loc: `/angebot/${offer.attributes.slug}`,
				lastmod: offer.attributes.updatedAt,
				changefreq: 'daily',
				priority: 0.8,
			}))
		} catch (error) {
			console.error(error)
			return []
		}
	},
}
