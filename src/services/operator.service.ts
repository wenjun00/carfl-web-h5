import { operatorController } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class operatorService {

  @Inject()
  private netService: NetService

  /**
   * 登录
   */
  @Debounce()
  orgSimpleListByRole(id) {
    return this.netService.send({
      server: operatorController.orgSimpleListByRole,
      append: id
    })
  }
}

