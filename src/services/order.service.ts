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
  query() {
    return this.netService.send({
      server: orderController.query
    })
  }
}

