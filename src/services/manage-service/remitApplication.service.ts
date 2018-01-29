import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'
export class RemitApplicationService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 分页查询减免或冻结
   */
  selectApplyForReliefHistory(data, page) {
    return this.netService.send({
      server: manageService.remitApplicationController.selectApplyForReliefHistory,
      data: data,
      page: page
    })
  }
}
