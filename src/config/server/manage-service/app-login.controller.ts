import { requestType } from "~/config/enum.config";
const SERVICE = 'service-manage'
const CONTROLLER = 'appLogin'

export default {
  /**
   * 获取验证码
   */
  getVerifyCode: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'appGetPersonalVericationCode',
    type: requestType.Get
  },
  /**
   * 根据验证码登陆
   */
  verifyCodeLogin: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'appVerificationLogin',
    type: requestType.Post
  },
   /**
   * 检测验证码
   */
  checkToken: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'checkToken',
    type: requestType.Get
  },
  /**
  * 退出
  */
 exit: {
   service: SERVICE,
   controller: CONTROLLER,
   action: 'exit',
   type: requestType.Post
 }
}
