import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class PersonalService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 根据客户三项查询历史订单
   */
  getCustomerHistoryFinanceInfo(data?) {
    return this.netService.send({
      server: manageService.personalController.getCustomerHistoryFinanceInfo,
      data: data
    })
  }
  /**
   * 客户信息查询
   */
  getPersonalMessage({ personalId }) {
    return this.netService.send({
      server: manageService.personalController.getPersonalMessage,
      data: {
        personalId: personalId
      }
    })
  }
  /**
  * 客户号获取开户信息
  */
  getBankByClientNumber({ clientNumber, settleChannel }) {
    return this.netService.send({
      server: manageService.personalController.getCustomerHistoryFinanceInfo,
      data: {
        clientNumber: clientNumber,
        settleChannel: settleChannel
      }
    })
  }
}