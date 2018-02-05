import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'
export class SystemParameterService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 分页查询系统参数
   */
  querySystemParameterPage(data, page) {
    return this.netService.send({
      server: manageService.systemParameterController.querySystemParameterPage,
      data: data,
      page: page
    })
  }
  /**
   * 
   * @param data 创建系统参数
   */
  createSystemParameter(data) {
    return this.netService.send({
      server: manageService.systemParameterController.createSystemParameter,
      data: data
    })
  }
  /**
  * 
  * @param data 修改系统参数
  */
  updateSystemParameter(data) {
    return this.netService.send({
      server: manageService.systemParameterController.updateSystemParameter,
      data: data
    })
  }
}
