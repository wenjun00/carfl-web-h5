import { requestType } from '~/config/enum.config'

const CONTROLLER = 'auth'

export const authController = {
  /**
   * 用户登录
   */
  login: {
    controller: CONTROLLER,
    action: 'login',
    type: requestType.Post
  }
  // /**
  //  * 用户登录
  //  */
  // getUserByToken: {
  //   service: SERVICE,
  //   controller: CONTROLLER,
  //   action: 'getUserByToken',
  //   type: 'GET'
  // }
}
