import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import store from "~/store"

export class WithdrawApplicationService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 获取销售收款申请信息
   */
  getSaleCollectMoneyApplicationInfo({ personalId, orderId }) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.getSaleCollectMoneyApplicationInfo,
      data: {
        personalId: personalId,
        orderId: orderId
      }
    })
  }
  /**
   * 获取提前结清信息
   */
  getAdvancePayoffApplicationInfo({ idCard, customerName, mobileMain }) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.getAdvancePayoffApplicationInfo,
      data: {
        idCard: idCard,
        customerName: customerName,
        mobileMain: mobileMain
      }
    })
  }
  /**
 * 获取提前收回信息
 */
  getAdvanceRevokeApplicationInfo(data) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.getAdvanceRevokeApplicationInfo,
      data: data,
    })
  }
  /**
   * 获取客户订单信息
   */
  getPersonalProductOrderInfo({ idCard, customerName, mobileMain }) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.getPersonalProductOrderInfo,
      data: {
        idCard: idCard,
        customerName: customerName,
        mobileMain: mobileMain
      }
    })
  }

}
