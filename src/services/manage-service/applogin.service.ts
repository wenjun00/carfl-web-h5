import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class LoginService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 获取验证码
   */
  @Debounce()
  getVerifyCode(phoneNumber) {
    return this.netService.send({
      server: manageService.appLoginController.getVerifyCode,
      data: {
        mobileCode: phoneNumber
      }
    })
  }

  /**
   * 通过验证码登录
   */
  verifyCodeLogin(data) {
    return this.netService.send({
      server: manageService.appLoginController.verifyCodeLogin,
      data: {
        mobileMain: data.phone,
        verificationCode: data.code
      },
      loading: true
    })
  }
  /**
   *  验证TOKEN
   */
  checkToken(token) {
    return this.netService.send({
      server: manageService.appLoginController.checkToken,
      data: {
        token: token
      }
    })
  }

  /**
   * 注销用户
   */
  logout(userId) {
    return this.netService.send({
      server: manageService.appLoginController.exit,
      data: {
        userId: userId
      }
    })
  }

}

