import httpClient from '@/services/http/http.service'

class AuthService {
    register(user: any) {
        return httpClient.post('/v1/auth/register', user, { auth: false })
    }

    doConfirm(email, confirmToken) {
        return httpClient.post('/v1/auth/confirm', { email, confirmToken }, { auth: false })
    }
}

const authService = new AuthService()

export default authService
