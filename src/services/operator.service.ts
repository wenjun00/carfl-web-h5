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
  orgSimpleListByOrg() {
    return this.netService.send({
      server: operatorController.orgSimpleListByOrg,
      append: '713182982016163840'
    })
  }
  createOperator(createParams) {
    return this.netService.send({
      server: operatorController.createOperator,
      data: createParams
    })
  }

}

