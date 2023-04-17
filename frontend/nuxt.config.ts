import i18n from './config/i18n'
import postcss from './config/postcss'
import sitemap from './config/sitemap'
import meta from './config/meta'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
		head: meta.head
	},
	modules: [
		'nuxt-simple-sitemap',
		'@nuxtjs/strapi',
		'@nuxtjs/i18n',
		'@formkit/nuxt'
	],
	nitro: {
		compressPublicAssets: true,
	},
	formkit: {
		configFile: '~/config/formkit.config.ts',
	},
	strapi: {
		url: process.env.API_BASE || 'http://localhost:1337',
	},
	css: [
		'~/assets/css/main.css',
		'~/assets/css/transitions.css',
		'@fortawesome/fontawesome-svg-core/styles.css'
	],
	runtimeConfig: {
		public: {
			mapbox: {
				token: process.env.MAPBOX_TOKEN,
			},
			email: {
				to: process.env.ADDRESS_TO
			},
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.heidivogler.de',
			siteName: meta.head.title,
			siteDescription: meta.head.meta.find((m) => m.name === 'description')?.content,
			language: 'de-DE',
			// titleSeparator: ' · ',
		}
	},
	i18n,
	postcss,
	// sitemap,
	extends: [
		'nuxt-seo-kit'
	]
})
