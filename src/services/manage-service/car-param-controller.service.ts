// 车辆参数管理service
import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class CarParamControllerService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 删除车辆参数
   */
  deleteCarParam({ id }) {
    return this.netService.send({
      server: manageService.carParamController.deleteCarParam,
      data: {
        id: id
      }
    })
  }
  /**
 * 获取所有的车辆参数
 */
  findAll(data) {
    return this.netService.send({
      server: manageService.carParamController.findAll,
    })
  }
  /**
* 查询对应的车辆参数的类型的参数
*/
  getCarParamByCode({ code }) {
    return this.netService.send({
      server: manageService.carParamController.getCarParamByCode,
      data: {
        code: code
      }
    })
  }
  /**
* 新增或者修改车辆参数
*/
  saveOrUpdate({ carParams }) {
    return this.netService.send({
      server: manageService.carParamController.saveOrUpdate,
      data: {
        carParams: carParams
      }
    })
  }

}
