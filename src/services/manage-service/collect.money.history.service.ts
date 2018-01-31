// 收款service
import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class CollectMoneyHistoryService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 获取收款列表
   */
  collectMoneyHistoryList(data, page) {
    return this.netService.send({
      server: manageService.collectMoneyHistoryController.collectMoneyHistoryList,
      data: data,
      page: page
    })
  }

}
