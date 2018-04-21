// 收款service
import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { FilterService } from "~/utils/filter.service"

export class CollectMoneyHistoryService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 获取收款列表
   */
  collectMoneyHistoryList(data, page) {
    const dateRange = FilterService.dateRanageFormat(data.dateRange)
    return this.netService.send({
      server: manageService.collectMoneyHistoryController.collectMoneyHistoryList,
      data: {
        accountName: data.accountName,
        queryStartDate: dateRange.start,
        queryEndDate: dateRange.end,
        timeSearch: data.timeSearch,
      },
      page: page
    })
  }
  /**
   * 申请详情
   */
  withdrawApplicationDetail(data) {
    return this.netService.send({
      server: manageService.collectMoneyHistoryController.withdrawApplicationDetail,
      data
    })
  }
  /**
   * 保存收款历史
   */
  saveCollectMoneyHistory(data) {
    return this.netService.send({
      server: manageService.collectMoneyHistoryController.saveCollectMoneyHistory,
      data
    })
  }
  /**
   * 保存收款历史草稿
   */
  saveCollectMoneyHistoryAsDraft(data) {
    return this.netService.send({
      server: manageService.collectMoneyHistoryController.saveCollectMoneyHistoryAsDraft,
      data
    })
  }
  /**
   * 保存收款历史草稿
   */
  sendBackWithdrawApplication(data) {
    return this.netService.send({
      server: manageService.collectMoneyHistoryController.sendBackWithdrawApplication,
      data
    })
  }
}
