import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class ProductOrderService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 获取组织
   */
  getOrderHandover(data, page) {
    return this.netService.send({
      server: manageService.productOrderController.getOrderHandover,
      data,
      page
    })
  }
  /**
   * 进件模块 - 订单交接 - 交接记录查询
   */
  findOrderHandoverHistory(data) {
    return this.netService.send({
      server: manageService.productOrderController.findOrderHandoverHistory,
      data
    })
  }
  /**
   * 进件模块-订单交接
   */
  orderTransfer(data) {
    return this.netService.send({
      server: manageService.productOrderController.orderTransfer,
      data
    })
  }
  /**
   * 根据订单号获取订单详情
   */
  findOrderInfoByOrderNumber({ orderNumber }) {
    return this.netService.send({
      server: manageService.productOrderController.findOrderInfoByOrderNumber,
      data: {
        orderNumber: orderNumber
      }
    })
  }
}