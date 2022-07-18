import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: [
		'@nuxtjs/strapi',
		'@formkit/nuxt'
	],
	strapi: {
		url: process.env.API_BASE || 'backend-production-e0a0.up.railway.app',
	},
	buildModules: [
		'@nuxtjs/tailwindcss',
	],
	css: [
		'@/assets/main.css',
		'@/assets/transitions.css',
		'@fortawesome/fontawesome-svg-core/styles.css'
	],
	build: {
		transpile: [
			'@fortawesome/fontawesome-svg-core',
			'@fortawesome/free-solid-svg-icons',
			'@fortawesome/free-brands-svg-icons',
		],
	},
	formkit: {
		configFile: '~/config/formkit.config.ts',
	},
	server: {
		host: "0.0.0.0",
		port: Number(process.env.PORT) || 3000,
	},
})
