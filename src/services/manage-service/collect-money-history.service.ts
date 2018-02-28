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
    return this.netService.send({
      server: manageService.collectMoneyHistoryController.collectMoneyHistoryList,
      data: {
        accountName: data.accountName,
        timeSearch: data.timeSearch,
        queryStartDate: FilterService.dateFormat(data.queryStartDate, 'yyyy-MM-dd'),
        queryEndDate: FilterService.dateFormat(data.queryEndDate, 'yyyy-MM-dd')
      },
      page: page
    })
  }

}
