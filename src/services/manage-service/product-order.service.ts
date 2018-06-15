import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class ProductOrderService {
  @Inject(NetService)
  private netService: NetService

  createOrder(data) {
    return this.netService.send({
      server: manageService.productOrderController.createOrder,
      data,
      loading: true
    })
  }
  /**
   * 根据用户手机号 获取用户订单
   * @param personalId 
   */
  getOrder(mobileMain) {
    return this.netService.send({
      server: manageService.productOrderController.getOrder,
      data: {
        mobileMain: mobileMain
      }
    })
  }
  /**
   * 根据用户订单号查询订单基本信息
   */
  findOrderInfoByOrderNumber(orderNumber) {
    return this.netService.send({
      server: manageService.productOrderController.findOrderInfoByOrderNumber,
      data: {
        orderNumber: orderNumber
      },
      loading: true
    })
  }

}
