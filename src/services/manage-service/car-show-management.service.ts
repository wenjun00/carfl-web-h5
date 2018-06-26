import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service'

export class carShowManagementService {
  @Inject(NetService)
  private netService: NetService

  @Debounce()
  getTopTenCarBrandList() {
    return this.netService.send({
      server: manageService.carShowManagementController.getTopTenCarBrandList,
    })
  }

  @Debounce()
  getAllCarBrandList() {
    return this.netService.send({
      server: manageService.carShowManagementController.getAllCarBrandList,
    })
  }

  @Debounce()
  getGoodCarShowModelList() {
    return this.netService.send({
      server: manageService.carShowManagementController.getGoodCarShowModelList,
    })
  }

  /**
   * 根据条件搜索汽车列表
   * @param param0 brandId：8非必填项， 品牌id
   * @param param1 name 非必填 品牌名称 ，车系名称，车辆名称
   */
  @Debounce()
  searchCarList({ brandId, name }) {
    return this.netService.send({
      server: manageService.carShowManagementController.getCarShowModelListByBrandIdAndName,
      data: {
        brandId: brandId || '',
        name: name || ''
      },
      loading: true
    })
  }
}