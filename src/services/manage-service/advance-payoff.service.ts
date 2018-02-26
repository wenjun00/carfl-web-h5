// 审批管理service
import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class AdvancePayoffService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 获取客户提前结清列表
   */
  getAdvancePayoffList(data, page) {
    return this.netService.send({
      server: manageService.advancePayoffController.getAdvancePayoffList,
      data: data,
      page: page
    })
  }
  /**
   * 
   * @param data 获取客户提前结清账单信息
   */
  getAdvancePayoffBillInfo(data) {
    return this.netService.send({
      server: manageService.advancePayoffController.getAdvancePayoffBillInfo,
      data: data
    })
  }
  /**
   * 客户划扣记录
   */
  getCustomerDeductionRecord(data) {
    return this.netService.send({
      server: manageService.advancePayoffController.getCustomerDeductionRecord,
      data: data
    })
  }
  /**
   * 获取已上传资料
   */
  getHaveUploadedResources(data) {
    return this.netService.send({
      server: manageService.advancePayoffController.getHaveUploadedResources,
      data: data
    })
  }
  /**
   * 客户还款记录详情
   */
  getPaymentRecordDetail(data) {
    return this.netService.send({
      server: manageService.advancePayoffController.getPaymentRecordDetail,
      data
    })
  }
  /**
   * 客户分期还款记录
   */
  getPaymentScheduleDetail(data, page) {
    return this.netService.send({
      server: manageService.advancePayoffController.getPaymentScheduleDetail,
      data: data,
      page: page
    })
  }
  /**
   * 确定
   */
  saveCollectMoneyHistory(data) {
    return this.netService.send({
      server: manageService.advancePayoffController.saveCollectMoneyHistory,
      data
    })
  }
  /**
   * 保存草稿
   */
  saveCollectMoneyHistoryAsDraft(data) {
    return this.netService.send({
      server: manageService.advancePayoffController.saveCollectMoneyHistoryAsDraft,
      data
    })
  }
  /**
   * 补传凭证资料
   */
  supplementUploadResources(data) {
    return this.netService.send({
      server: manageService.advancePayoffController.supplementUploadResources,
      data
    })
  }
}
