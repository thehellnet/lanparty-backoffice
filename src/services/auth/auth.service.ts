import httpClient from '@/services/http/http.service'

class AuthService {
    register(user: any) {
        return httpClient.post('/v1/auth/register', user, { auth: false })
    }
}

const authService = new AuthService()

export default authService
