import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class jobService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 批量管理查询
  */
 list( page) {
    return this.netService.send({
      server: manageService.jobController.list,
      page: page
    })
  }
 



 

 
}