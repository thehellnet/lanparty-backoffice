import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Vue } from 'vue-property-decorator'

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)
