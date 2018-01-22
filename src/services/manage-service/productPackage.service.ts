// import { productPackageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class ProductPackageService {
  @Inject()
  private netService: NetService

  /**
   * 获取订单交接
   */
  // @Debounce()
  // getAllProductPackage() {
  //     return this.netService.send({
  //         server: productPackageService.productPackageController.getAllProductPackage,
  //         data: {}
  //     })
  // }
}
