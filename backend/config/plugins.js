module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET'),
    },
  },
  'drag-drop-content-types': {
    enabled: true
  },
  'icon-picker': {
    enabled: true,
    resolve: './src/plugins/icon-picker'
  },
  "rest-cache": {
    config: {
      provider: {
        name: "memory",
        options: {
          max: 32767,
          maxAge: 3600,
        },
      },
      strategy: {
        contentTypes: [
          // list of Content-Types UID to cache
          "api::datenschutz.datenschutz",
          "api::impressum.impressum",
          "api::about.about",
          "api::event.event",
          "api::home.home",
          "api::offer.offer",
        ],
      },
    },
  },
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_ACCESS_SECRET'),
        region: env('AWS_REGION'),
        params: {
          Bucket: env('AWS_BUCKET'),
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
      breakpoints: {
        xlarge: 2000,
        large: 1000,
        medium: 750,
        small: 500,
      }
    },
  },
  email: {
    config: {
      provider: env('PROVIDER'),
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.example.com'),
        port: env('SMTP_PORT', 587),
        auth: {
          user: env('SMTP_USER'),
          pass: env('SMTP_PASS'),
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: env('ADDRESS_FROM'),
        defaultReplyTo: env('ADDRESS_REPLY'),
      },
    },

  },

});
