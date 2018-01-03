import { resourceController } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class ResourceService {

  @Inject()
  private netService: NetService

  /**
   * 获取所有资源
   */
  @Debounce()
  getAllResources() {
    return this.netService.send({
      server: resourceController.getAllResources
    })
  }
}

