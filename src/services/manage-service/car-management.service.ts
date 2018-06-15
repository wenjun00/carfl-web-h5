import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service'

export class carManagementService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 根据车辆id查询车辆属性列表
   */
  @Debounce()
  getCarParamList(carId) {
    return this.netService.send({
      server: manageService.carManagementController.getCarParamList,
      data:{
        carId:carId
      },
      loading: true
    })
  }
  /**
   * 获取车辆信息
   */
  @Debounce()
  getCarDetail(carId) {
    return this.netService.send({
      server: manageService.carManagementController.getCarDetail,
      data: {
        carId: carId
      },
      loading: true
    })
  }
  /**
   * 通过carId查找出栏目信息
   */
  @Debounce()
  getCarColumnCollectModel(carId) {
    return this.netService.send({
      server: manageService.carManagementController.getCarColumnCollectModel,
      data:{
        carId:carId
      },
      loading: true
    })
  }

  /**
   * 获取车辆详情首页图片
   */
  @Debounce()
  getCarPictureList(carId) {
    return this.netService.send({
      server: manageService.carManagementController.getCarPictureList,
      data:{
        carId: carId
      },
      loading: true
    })
  }



}