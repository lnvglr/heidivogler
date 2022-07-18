import { de } from '@formkit/i18n'
import { DefaultConfigOptions } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'

const config: DefaultConfigOptions = {
  locales: { de },
  locale: 'de',
  config: {
    classes: generateClasses({
      global: { // applies to all input types
        input: ''
      },
      text: { // only applies to text input type
        input: ''
      },
      textarea: {
        input: ''
      }
    })
  }
}

export default config
