module.exports = [
  'strapi::compression',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'res.cloudinary.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'res.cloudinary.com',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::poweredBy',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: process.env.NODE_ENV === 'development' ? ['http://localhost:1337', 'http://localhost:3000'] : [process.env.API_BASE, process.env.NUXT_PUBLIC_SITE_URL],
    }
  },
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
