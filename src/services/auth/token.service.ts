import appLocalStorage from '@/services/app-storage/app-storage.service'

const TOKEN_KEY = 'token'
class TokenService {
    setToken(token: string) {
        appLocalStorage.setItem(TOKEN_KEY, token)
    }

    getToken() {
        return appLocalStorage.getItem(TOKEN_KEY)
    }

    clearToken() {
        appLocalStorage.removeItem(TOKEN_KEY)
    }
}

const tokenService = new TokenService()
export default tokenService
