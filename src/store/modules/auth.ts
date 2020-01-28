import httpClient from '../../services/http/http.service'
import tokenService from '../../services/auth/token.service'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import logger from '@/services/app-logger/app-logger.service'

@Module({
    namespaced: true,
})
class AuthModule extends VuexModule {
    public user: any = null
    public authenticated: boolean = false

    @Mutation
    setUser(user) {
        this.user = user
    }

    @Mutation
    setAuthenticated(authenticated) {
        this.authenticated = authenticated
    }

    get isAuthenticated() {
        return this.authenticated
    }

    @Action({ commit: 'setAuthenticated' })
    async doLogin(user) {
        try {
            const response = await httpClient.post('/v1/auth/login', user, { auth: false })
            tokenService.setToken(response.data.token)
        } catch (e) {
            return false
        }
        return true
    }

    @Action({ commit: 'setAuthenticated' })
    doLogout() {
        tokenService.clearToken()
        return false
    }
}

export default AuthModule
