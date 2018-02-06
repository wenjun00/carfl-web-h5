import { loginController } from '~/config/server'
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
      server: loginController.login,
      data: {
        userUsername: username,
        userPassword: md5(password),
        loginDevice: loginDevice,
        loginType: loginType
      }
    })
  }
  /**
   *  重置密码
   */
  resetPassword({ userId }) {
    return this.netService.send({
      server: loginController.resetPassword,
      data: {
        userId: userId
      }
    })
  }
}

