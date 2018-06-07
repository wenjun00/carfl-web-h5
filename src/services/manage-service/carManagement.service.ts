import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class carManagementService {
  @Inject(NetService)
  private netService: NetService
  /**
   * 根据车辆id查询车辆属性列表
   */
  getCarParamList(data) {
    return this.netService.send({
      server: manageService.carManagementController.getCarParamList,
      data
    })
  }
  /**
   * 获取车辆信息
   */
  getCarDetail(data) {
    return this.netService.send({
      server: manageService.carManagementController.getCarDetail,
      data
    })
  }
  /**
   * 通过carId查找出栏目信息
   */
  getCarColumnCollectModel(data) {
    return this.netService.send({
      server: manageService.carManagementController.getCarColumnCollectModel,
      data
    })
  }

}