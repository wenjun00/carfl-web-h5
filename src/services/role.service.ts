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
    // console.log(this.netService)
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
      server: roleController.updateRole,
      data: updateParams
    })
  }
  /**
   * 删除角色
   */
  deleteRole(id) {
    return this.netService.send({
      server: roleController.deleteRole,
      append: id
    })
  }
  /**
   * 根据id查找角色
   */
  getRoleById(id) {
    return this.netService.send({
      server: roleController.getRole,
      append: id
    })
  }

}

