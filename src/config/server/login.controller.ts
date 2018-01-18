import { requestType } from '~/config/enum.config'

const CONTROLLER = 'login'

export const loginController = {
  /**
   * 用户登录
   */
  login: {
    controller: CONTROLLER,
    action: 'login',
    type: requestType.Post
  },
  /**
   * 重置密码
   */
  resetPassword: {
    controller: CONTROLLER,
    action: 'resetPassword',
    type: requestType.Post
  }
}
