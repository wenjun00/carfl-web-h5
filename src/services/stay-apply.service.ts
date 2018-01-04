import { stayApplyController } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class stayApplyService {

  @Inject()
  private netService: NetService

  /**
   * 留案申请记录查询
   */
  @Debounce()
  getAllStayApply(data, page) {
    return this.netService.send({
      server: stayApplyController.getAllStayApply,
      data: data,
      page: page
    })
  }
}

