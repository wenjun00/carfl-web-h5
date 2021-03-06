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
   * 获取订单信息
   */
  verifyCodeLogin(data) {
    return this.netService.send({
      server: manageService.appLoginController.verifyCodeLogin,
      data: {
        mobilePhone: data.phoneNumber,
        verificationCode: data.verifyCode
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
  /**
   * 进件后查看订单号
   */
  getOrderNoByToken(data) {
    return this.netService.send({
      server: manageService.appLoginController.getOrderNoByToken,
      data: {
        token: data.token
      }
    })
  }

  /**
   * 对token进行验证，返回登录数据
   * @param token 
   */
  checkBackToken(token: string) {
    return this.netService.send({
      server: manageService.appLoginController.checkBackToken,
      data: {
        token: token
      }
    })
  }

}

