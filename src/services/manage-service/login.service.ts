import { manageService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import md5 from 'md5'

export class LoginService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 登录
   */
  @Debounce()
  login({ username, password, loginDevice, loginType }) {
    return this.netService.send({
      server: manageService.loginController.login,
      data: {
        userUsername: username,
        userPassword: md5(password),
        loginDevice: loginDevice,
        loginType: loginType
      }
    })
  }

  /**
   * 通过token登录
   */
  getUserByToken() {
    return this.netService.send({
      server: manageService.loginController.getUserByToken
    })
  }
  /**
   *  重置密码
   */
  resetPassword({ userId }) {
    return this.netService.send({
      server: manageService.loginController.resetPassword,
      data: {
        userId: userId
      }
    })
  }
}

