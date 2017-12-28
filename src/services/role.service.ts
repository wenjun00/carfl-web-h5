import { roleController } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class RoleService {

  @Inject()
  private netService: NetService

  /**
   * 获取所有角色信息
   */
  @Debounce()
  getAllRoles() {
    return this.netService.send({
      server: roleController.getAllRoles
    })
  }
}

