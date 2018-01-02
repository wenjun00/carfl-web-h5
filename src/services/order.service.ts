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
  query(state) {
    return this.netService.send({
      server: orderController.query,
      data: {
        "state": state
      }
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
   * 查看案件详情
   */
  getOrder(id) {
    return this.netService.send({
      server: orderController.getOrder,
      append: id
    })
  }
}

