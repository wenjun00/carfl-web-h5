import { organizationController } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class organizationService {

  @Inject(NetService)
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
  /**
   * 创建机构
   */
  createOrganization(create) {
    return this.netService.send({
      server: organizationController.createOrganization,
      data: create
    })
  }
  /**
   * 修改机构
   */
  updateOrganization(modify) {
    return this.netService.send({
      server: organizationController.updateOrganization,
      data: modify
    })
  }
  /**
   * 删除机构
   */
  deleteOrganization(id) {
    return this.netService.send({
      server: organizationController.deleteOrganization,
      append: id
    })
  }
}
