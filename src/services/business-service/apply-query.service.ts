import { businessService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class ApplyQueryService {
  @Inject()
  private netService: NetService

  /**
   * 获取订单交接
   */
  @Debounce()
  getFullQueryData() {
    return this.netService.send({
      server: businessService.applyQueryController.getFullQueryData,
      data: {}
    })
  }
  @Debounce()
  addCarQueryData() {
    return this.netService.send({
      server: businessService.applyQueryController.addCarQueryData,
      data: {}
    })
  }
}
