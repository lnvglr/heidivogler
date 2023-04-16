import { Offer } from '~/types'
import { Strapi4ResponseMany } from '@nuxtjs/strapi/dist/runtime/types'
import fetch from 'node-fetch'
const apiBase = process.env.API_BASE || 'http://localhost:1337'
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL

export default {
	siteUrl,
	urls: async () => {
		try {
			const res = await fetch(`${apiBase}/api/offers`)
			const { data } = (await res.json() as Strapi4ResponseMany<Offer>)
			return (data).map((offer) => ({
				loc: `/angebot/${offer.attributes.slug}`,
				lastmod: offer.attributes.updatedAt,
				changefreq: 'weekly',
				priority: 0.8,
			}))
		} catch (error) {
			console.error(error)
			return []
		}
	},
}
