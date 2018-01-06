import { testService } from '~/config/server'

export default {
  /**
   * 用户登录
   */
  getUserAuth: {
    server: testService.testController.getUserMenu,
    data: [{
      title:1
    }]
  }
}

