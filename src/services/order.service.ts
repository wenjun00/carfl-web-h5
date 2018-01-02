import { orderController } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class orderService {

  @Inject()
  private netService: NetService

  /**
   * 查询案件
   */
  @Debounce()
  query(state, page?) {
    return this.netService.send({
      server: orderController.query,
      data: {
        "state": state,
      },
      page: page
    })
  }

  /**
   * 待接收案件
   */
  queryTeamAssigned() {
    return this.netService.send({
      server: orderController.queryTeamAssigned
    })
  }
  /**
   * 已入库案件
   */
  // queryTeamStorage()
}

