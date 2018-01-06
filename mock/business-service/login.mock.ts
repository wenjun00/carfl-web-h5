import { businessService } from '~/config/server'

export default {
  /**
   * 用户登录
   */
  login: {
    server: businessService.loginController.login,
    data: {
      user:{
        name:'test'
      },
      token:"test"
    }
  }
}

