import BaseService from './http/base.service'

class AppUserService extends BaseService {
    constructor() {
        super('appUser')
    }
}

const appUserService = new AppUserService()

export default appUserService
