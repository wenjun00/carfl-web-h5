import { requestType } from '~/config/enum.config'

const SERVICE = 'manage-service'
const CONTROLLER = 'login'

export default {
  /**
   * 用户登录
   */
  login: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'login',
    type: requestType.Post
  },
  /**
   * 重置密码
   */
  resetPassword: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'resetPassword',
    type: requestType.Post
  },
  /**
   * 重置密码
   */
  getUserByToken: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getUserByToken',
    type: requestType.Get
  }
}
