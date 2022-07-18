'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('icon-picker')
      .service('myService')
      .getWelcomeMessage();
  },
};
