const CONTROLLER = 'auth'

export const authController =  {
  /**
   * 用户登录
   */
  login: {
    controller: CONTROLLER,
    action: 'login',
    type: 'POST'
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
