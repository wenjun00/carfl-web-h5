import { storageApplyController } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class storageApplyService {

  @Inject()
  private netService: NetService

  /**
   * 获取所有角色信息
   */
  @Debounce()
  getAllStorageApply(data, page) {
    return this.netService.send({
      server: storageApplyController.getAllStorageApply,
      data: data,
      page: page
    })
  }
}

