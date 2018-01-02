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
  /**
   * 新增角色
   */
  createRole(name) {
    return this.netService.send({
      server: roleController.createRole,
      data: {
        name: name
      }
    })
  }
  /**
   * 更新角色
   */
  updateRole(updateParams) {
    return this.netService.send({
      server: roleController.createRole,
      data: updateParams
    })
  }
  deleteRole(id) {
    return this.netService.send({
      server: roleController.deleteRole,
      append: {
        id: id
      }
    })
  }
}

