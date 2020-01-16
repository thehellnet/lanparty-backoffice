import BaseService from "./http/base.service";

class UserService extends BaseService {
  constructor() {
    super("appUser");
  }
}

const userService =  new UserService();

export default userService
