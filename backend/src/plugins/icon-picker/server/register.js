'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'icon',
    plugin: 'icon-picker',
    type: 'string',
  });
};
