import { returnApplyController } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class returnApplyService {

  @Inject()
  private netService: NetService

  /**
   * 获取所有角色信息
   */
  @Debounce()
  getAllReturnApply() {
    return this.netService.send({
      server: returnApplyController.getAllReturnApply
    })
  }
}

