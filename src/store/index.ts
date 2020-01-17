import { Vue } from 'vue-property-decorator'
import Vuex from 'vuex'
import spinner from '@/store/modules/spinner'
import auth from '@/store/modules/auth'
import SpinnerModule from '@/store/modules/spinner'
import AuthModule from '@/store/modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        SpinnerModule: SpinnerModule,
        AuthModule: AuthModule,
    },
    strict: true,
})
