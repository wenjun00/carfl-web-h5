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
}