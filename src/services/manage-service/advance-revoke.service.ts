// 审批管理service
import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class AdvanceRevokeService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 获取客户提前收回列表
   */
  getAdvanceRevokeList(data, page) {
    return this.netService.send({
      server: manageService.advanceRevokeController.getAdvanceRevokeList,
      data: data,
      page: page
    })
  }
  /**
   * 
   * @param data 获取客户提前收回账单信息
   */
  getAdvanceRevokeBillInfo(data) {
    return this.netService.send({
      server: manageService.advanceRevokeController.getAdvanceRevokeBillInfo,
      data: data
    })
  }
  /**
   * 客户划扣记录
   */
  getCustomerDeductionRecord(data) {
    return this.netService.send({
      server: manageService.advanceRevokeController.getCustomerDeductionRecord,
      data: data
    })
  }
  /**
   * 获取已上传资料
   */
  getHaveUploadedResources(data) {
    return this.netService.send({
      server: manageService.advanceRevokeController.getHaveUploadedResources,
      data: data
    })
  }
  /**
   * 客户还款记录详情
   */
  getPaymentRecordDetail(data) {
    return this.netService.send({
      server: manageService.advanceRevokeController.getPaymentRecordDetail,
      data
    })
  }
  /**
   * 客户分期还款记录
   */
  getPaymentScheduleDetail(data, page) {
    return this.netService.send({
      server: manageService.advanceRevokeController.getPaymentScheduleDetail,
      data: data,
      page: page
    })
  }
  /**
   * 确定
   */
  saveCollectMoneyHistory(data) {
    return this.netService.send({
      server: manageService.advanceRevokeController.saveCollectMoneyHistory,
      data
    })
  }
  /**
   * 保存草稿
   */
  saveCollectMoneyHistoryAsDraft(data) {
    return this.netService.send({
      server: manageService.advanceRevokeController.saveCollectMoneyHistoryAsDraft,
      data
    })
  }
  /**
   * 补传凭证资料
   */
  supplementUploadResources(data) {
    return this.netService.send({
      server: manageService.advanceRevokeController.supplementUploadResources,
      data
    })
  }
}
