import { authController } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class AuthService {

  @Inject()
  private netService: NetService

  /**
   * 登录
   */
  @Debounce()
  login({ username, password }) {
    return this.netService.send({
      server: authController.login,
      data: {
        username,
        password: password
      }
    })
  }

  // /**
  //  * 登录
  //  */
  // getUserByToken(token) {
  //   return this.netService.send({
  //     server: authController.loginController.getUserByToken,
  //     headers: {
  //       'X-UserToken': token
  //     }
  //   })
  // }
}

