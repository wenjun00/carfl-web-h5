const SERVICE = 'business-service'
const CONTROLLER = 'login'

export default {
  /**
   * 用户登录
   */
  login: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'login',
    type: 'POST'
  },
  /**
   * 用户登录
   */
  getUserByToken: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getUserByToken',
    type: 'GET'
  }
}