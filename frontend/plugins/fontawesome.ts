import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas, faEnvelope, faArrowLeft, faArrowRight, faCalendar, faCalendarPlus, faQuoteRight, faStar } from '@fortawesome/free-solid-svg-icons'
import { fab, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'
library.add(
  fab, fas,
  faEnvelope,
  faArrowLeft,
  faArrowRight,
  faCalendar,
  faCalendarPlus,
  faQuoteRight,
  faStar,
  faInstagram,
  faFacebook
)
// import { far } from '@fortawesome/free-regular-svg-icons'
// library.add(far)

config.autoAddCss = false

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)

})