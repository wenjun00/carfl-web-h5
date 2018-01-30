import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class PaymentScheduleService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 客户还款查询
   */
  getCustomerPayments(data, page) {
    return this.netService.send({
      server: manageService.paymentScheduleController.getCustomerPayments,
      data: data,
      page: page
    })
  }
  /**
   * 还款详情（彭长须接口）
   */
  getPaymentRecordDetail({ personalId, businessId }) {
    return this.netService.send({
      server: manageService.paymentScheduleController.getPaymentRecordDetail,
      data: {
        personalId: personalId,
        businessId: businessId
      }
    })
  }
  /**
   * 还款总揽
   */
  getRepaymentOverview({ orderId }) {
    return this.netService.send({
      server: manageService.paymentScheduleController.getRepaymentOverview,
      data: {
        orderId: orderId
      }
    })
  }
  /**
   * 还款详情(吴小川接口)
   */
  getPaymentDetail({ orderId }) {
    return this.netService.send({
      server: manageService.paymentScheduleController.getPaymentDetail,
      data: {
        orderId: orderId
      }
    })
  }
}