// 审批管理service
import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class PayoffProductOrderService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 获取已未结清订单信息
   */
  getPayoffProductOrders(data, page) {
    return this.netService.send({
      server: manageService.payoffProductOrderController.getPayoffProductOrders,
      data: data,
      page: page
    })
  }
  /**
   * 
   * @param data 客户扣款记录
   */
  getCustomerDeductionRecord(data) {
    return this.netService.send({
      server: manageService.payoffProductOrderController.getCustomerDeductionRecord,
      data: data
    })
  }
  /**
   * 获取已上传资料
   */
  getHaveUploadedResources(data) {
    return this.netService.send({
      server: manageService.payoffProductOrderController.getHaveUploadedResources,
      data: data
    })
  }
  /**
   * 客户还款记录详情
   */
  getPaymentRecordDetail(data) {
    return this.netService.send({
      server: manageService.payoffProductOrderController.getPaymentRecordDetail,
      data
    })
  }
  /**
   * 补传凭证资料
   */
  supplementUploadResources(data) {
    return this.netService.send({
      server: manageService.payoffProductOrderController.supplementUploadResources,
      data
    })
  }
}
