// 车辆参数类型管理service
import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class CarParamTypeControllerService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 根据车辆ID获取所有的参数类型
   */
  getCarParamTypeByCarId({ carId }) {
    return this.netService.send({
      server: manageService.carParamTypeController.getCarParamTypeByCarId,
      data: {
        carId: carId
      }
    })
  }
  /**
 * 新增或者修改参数类型
 */
  saveOrUpdate(data) {
    return this.netService.send({
      server: manageService.carParamTypeController.saveOrUpdate,
      data: data
    })
  }

}
