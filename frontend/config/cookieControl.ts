export default {
	colors: {
		checkboxActiveBackground: '#00A34A', // text-green-600
	},
	closeModalOnClickOutside: true,
	cookies: {
		optional: [
			{
				id: 'o',
				name: 'Optional Cookie',
				links: {
					'/': 'Local Privacy Policy',
					'https://example.com': '3rd Party Privacy Policy',
					'https://example.cop': null,
				},
				targetCookieIds: ['_o', '_p', '_t'],
			},
		],
	},
	isCookieIdVisible: true,
	isIframeBlocked: true,
	locales: ['en', 'de'],
	localeTexts: {
		de: {
			// bannerTitle: "Wir verwenden Cookies",
			// bannerDescription: "Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern.",
			// accept: "Akzeptieren",
			// decline: "Ablehnen",
			// manageCookies: "Cookies verwalten",
			// save: "Speichern",
			// cookiesNecessary: "Notwendige Cookies",
			// cookiesFunctional: "Funktionale Cookies",
			// cookiesOptional: "Optionale Cookies",
			// acceptAll: "Alle akzeptieren",
			// declineAll: "Alle ablehnen",
			// close: "Schließen",
			// here: "hier",
			// iframeBlocked: "Um diesen Inhalt anzuzeigen, müssen Sie funktionale Cookies akzeptieren.",
			// settingsUnsaved: "Die Einstellungen wurden nicht gespeichert.",
		},
	},
	isCssEnabled: false,
}