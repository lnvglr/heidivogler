const locales = ['de'].reduce((acc, locale) => {
  acc[locale] = import(`../locales/${locale}.json`)
  return acc
}, {})
export default {
  strategy: 'no_prefix',
  locales: Object.keys(locales),
  defaultLocale: 'de',
  detectBrowserLanguage: false,
  vueI18n: {
    locale: 'de',
    fallbackLocale: 'de',
    messages: locales,
  },
}