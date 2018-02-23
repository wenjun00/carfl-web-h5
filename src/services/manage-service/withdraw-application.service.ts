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
  getAdvancePayoffApplicationInfo({ personalId, orderId }) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.getAdvancePayoffApplicationInfo,
      data: {
        personalId: personalId,
        orderId: orderId
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

  /**
 * 获取提前收回信息
 */
  // getPersonalProductOrderInfo(data) {
  //   return this.netService.send({
  //     server: manageService.withdrawApplicationController.getPersonalProductOrderInfo,
  //     data: data,
  //   })
  // }
  /**
  * 获取销售收款项
  */
  getSaleCollectMoneyItems({ orderId }) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.getSaleCollectMoneyItems,
      data: {
        orderId: orderId
      }
    })
  }
  /**
   * 销售收款申请保存草稿
   */
  saveSaleCollectMoneyApplicationAsDraft(data) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.saveSaleCollectMoneyApplicationAsDraft,
      data: data
    })
  }
  /**
   * 销售收款申请 保存并提交
   */
  saveSaleCollectMoneyApplication(data) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.saveSaleCollectMoneyApplication,
      data: data
    })
  }
  /**
   * 获取提前结清收款项
   */
  getAdvancePayoffItems({ orderId }) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.getAdvancePayoffItems,
      data: {
        orderId: orderId
      }
    })
  }
}
