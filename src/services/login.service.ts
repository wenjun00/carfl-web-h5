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
  login({ username, password }) {
    return this.netService.send({
      server: loginController.login,
      data: {
        userPassword: username,
        userUsername: md5(password)
      }
    })
  }
}

