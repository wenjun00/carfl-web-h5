//backlog-controller : 待办事项管理
import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class FinanceInvoiceService {
  @Inject(NetService)
  private netService: NetService

  /** 
   * 财务开票列表
   */
  getFinanceInvoiceList(data, page) {
    return this.netService.send({
      server: manageService.financeInvoiceController.getFinanceInvoiceList,
      data,
      page
    })
  }
}
