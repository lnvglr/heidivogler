import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import Icon from "./components/IconPickerIcon/index.js"

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
    app.customFields.register({
      pluginId,
      name: "icon",
      type: "string",
      intlLabel: {
        id: "icon-picker.icon.label",
        defaultMessage: "Icon",
      },
      intlDescription: {
        id: "icon-picker.icon.description",
        defaultMessage: "Select a FontAwesome icon",
      },
      icon: Icon,
      components: {
        Input: async () => import(/* webpackChunkName: "input-component" */ "./components/IconPickerField/index.js"),
      },
      options: {
        // declare options here
      },
    });

  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map(locale => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
