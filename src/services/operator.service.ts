import { operatorController } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class operatorService {

  @Inject()
  private netService: NetService

  /**
   * 获取角色下用户列表
   */
  @Debounce()
  orgSimpleListByRole(id) {
    return this.netService.send({
      server: operatorController.orgSimpleListByRole,
      append: id
    })
  }
  /**
   * 获取组织下用户列表
   */
  orgSimpleListByOrg() {
    return this.netService.send({
      server: operatorController.orgSimpleListByOrg,
      append: '713182982016163840'
    })
  }
  /**
   * 新建用户
   */
  createOperator(createParams) {
    return this.netService.send({
      server: operatorController.createOperator,
      data: createParams
    })
  }
  /**
   * 修改用户
   */
  updateOperator(updateParams) {
    return this.netService.send({
      server: operatorController.updateOperator,
      data: updateParams
    })
  }

}

