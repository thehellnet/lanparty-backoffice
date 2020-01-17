import { Vue } from 'vue-property-decorator'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/fontawesome'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
