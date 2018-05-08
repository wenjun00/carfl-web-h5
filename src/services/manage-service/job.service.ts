//批量管理
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
 list(page) {
    return this.netService.send({
      server: manageService.jobController.list,
      page: page
    })
  }
   /**
   * 新增批量
  */
 add(data) {
    return this.netService.send({
      server: manageService.jobController.add,
      data: data
    })
  }

  /**
   * 暂停管理
  */
 pause(data) {
    return this.netService.send({
      server: manageService.jobController.pause,
      data: data
    })
  }

  /**
   * 启用管理
  */
 resume(data) {
    return this.netService.send({
      server: manageService.jobController.resume,
      data: data
    })
  }

 /**
  * 运行管理
  */
 run(data) {
    return this.netService.send({
      server: manageService.jobController.run,
      data: data
    })
  }
 
}