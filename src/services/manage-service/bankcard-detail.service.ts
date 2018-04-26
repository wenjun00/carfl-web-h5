//backlog-controller : 待办事项管理
import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class BankcardDetailService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 查询银行卡信息查询
   */
  getAllBankCards(data) {
    return this.netService.send({
      server: manageService.bankcardDetailCotroller.getAllBankCards,
      data: data
    })
  }
}
