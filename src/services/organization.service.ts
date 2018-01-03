import { organizationController } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class organizationService {

  @Inject()
  private netService: NetService

  /**
   * 查询案件
   */
  @Debounce()
  getAllOrganizations() {
    return this.netService.send({
      server: organizationController.getAllOrganizations
    })
  }
}

