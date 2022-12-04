import i18n from './config/i18n'
import postcss from './config/postcss'
import compress from './config/compress'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	app: {
		pageTransition: { name: 'page', mode: 'out-in' }
	},
	modules: [
		'@nuxtjs/strapi',
		'@nuxtjs/i18n',
		'@formkit/nuxt'
	],
	buildModules: [
		'nuxt-compress'
	],
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
	i18n,
	postcss,
	'nuxt-compress': compress,
	runtimeConfig: {
		public: {
			mapbox: {
				token: process.env.MAPBOX_TOKEN,
			}
		}
	},
})