import Vuex from 'vuex'
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({
    namespaced: true,
})
class SpinnerModule extends VuexModule {
    public loading: boolean = false

    @Mutation
    show() {
        this.loading = true
    }
    @Mutation
    hide(state) {
        this.loading = false
    }
    @Mutation
    toggle(state) {
        this.loading = !this.loading
    }
}

export default SpinnerModule
