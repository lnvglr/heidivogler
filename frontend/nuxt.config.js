import { defineNuxtConfig } from 'nuxt'
import i18n from './config/i18n'
import pwa from './config/pwa'


// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: [
		'@nuxtjs/strapi',
		'@kevinmarrec/nuxt-pwa',
		'@formkit/nuxt'
	],
	strapi: {
		url: process.env.API_BASE || 'http://localhost:1337',
	},
	env: {
		strapiBaseUri: process.env.API_URL || "http://localhost:1337"
	},
	buildModules: [
		'@nuxtjs/tailwindcss', '@intlify/nuxt3', ['@nuxt-modules/compression']
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
	intlify: i18n,
	pwa,
})
