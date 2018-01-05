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
  query(state, page?, sort?) {
    return this.netService.send({
      server: orderController.query,
      data: {
        "state": state
      },
      page: page,
      sort: sort
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
  /**
   * 手动分案
   */
  manualDistribute(idArr, orgId) {
    return this.netService.send({
      server: orderController.manualDistribute,
      data: {
        organizationId: orgId,
        ids: idArr
      }
    })
  }
}

