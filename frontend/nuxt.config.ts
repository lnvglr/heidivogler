import { useNuxt } from '@nuxt/kit'
import i18n from './config/i18n'
import postcss from './config/postcss'
import sitemap from './config/sitemap'
import image from './config/image'
import meta from './config/meta'
import gtm from './config/gtm'
import cookieControl from './config/cookieControl'

const isOgImageModule = (mod: unknown) => {
	const name = Array.isArray(mod) ? mod[0] : mod
	return typeof name === 'string' && name.includes('nuxt-og-image')
}

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
		'@nuxt/image-edge',
		'@formkit/nuxt',
		'@zadigetvoltaire/nuxt-gtm',
		"@dargmuesli/nuxt-cookie-control"
	],
	hooks: {
		// nuxt-seo-kit always installs nuxt-og-image; strip it before setup so
		// satori/chromium handlers never enter the production server bundle.
		'modules:before'() {
			const nuxt = useNuxt()
			nuxt.options.modules = nuxt.options.modules.filter((mod) => !isOgImageModule(mod))
			nuxt.options._modules = nuxt.options._modules.filter((mod) => !isOgImageModule(mod))
		},
	},
	// Override nuxt-seo-kit: island rendering was only needed for OG templates.
	experimental: {
		componentIslands: false,
	},
	nitro: {
		compressPublicAssets: true,
		// Optimize for production to reduce memory usage
		prerender: {
			crawlLinks: false, // Disable link crawling to save memory during build
		},
		// Reduce memory usage in production
		experimental: {
			wasm: false, // Disable WASM if not needed
		},
		// Route rules to limit caching and prevent memory accumulation
		routeRules: {
			// Limit image caching to prevent unbounded growth
			'/images/**': { 
				headers: { 
					'Cache-Control': 'public, max-age=3600, s-maxage=3600' 
				},
				cors: true,
			},
			'/__og_image__/**': { redirect: '/' },
		},
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
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
			siteName: meta.head.title,
			siteDescription: meta.head.meta.find((m) => m.name === 'description')?.content,
			siteImage: meta.ogImage,
			language: 'de-DE',
			// titleSeparator: ' · ',
		}
	},
	i18n,
	postcss,
	image,
	gtm,
	cookieControl,
	// sitemap,
	extends: [
		'nuxt-seo-kit'
	],
})