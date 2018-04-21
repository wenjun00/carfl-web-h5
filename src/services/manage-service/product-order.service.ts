import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class ProductOrderService {
  @Inject(NetService)
  private netService: NetService


  /**
   * 获取订单交接列表
   */
  getOrderHandover(data, page) {
    const dateRange = FilterService.dateRanageFormat(data.dateRange)
    return this.netService.send({
      server: manageService.productOrderController.getOrderHandover,
      data:{
        orderInfo: data.orderInfo, // 请输入客户姓名/证件号码/联系号码/订单所属人查询
        startTime: dateRange.start, // 起始日期
        endTime: dateRange.end, // 终止日期
        timeSearch: data.timeSearch,
      },
      page:page
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
  /**
   * 进件模块--订单查询
   */
  orderSearch(data, page) {
    const dataRange = FilterService.dateRanageFormat(data.dateRange)
    return this.netService.send({
      server: manageService.productOrderController.orderSearch,
      data: data,
      page: page
    })
  }
  /**
     * 创建全额付款订单
     */
  createFullPaymentOrder(data) {
    return this.netService.send({
      server: manageService.productOrderController.createFullPaymentOrder,
      data
    })
  }
  /**
   * 创建融资租赁订单
   */
  saveFinanceApplyInfo(data) {
    return this.netService.send({
      server: manageService.productOrderController.saveFinanceApplyInfo,
      data
    })
  }
  /**
   * 批量导出订单列表
   */
  exportProductList({ ids }) {
    return this.netService.send({
      server: manageService.productOrderController.exportProductList,
      data: {
        ids: ids
      }
    })
  }
  /**
   * 查询订单状态变更列表
   */
  getOrderStatusChange({ orderInfo }, page) {
    return this.netService.send({
      server: manageService.productOrderController.getOrderStatusChange,
      data: {
        orderInfo: orderInfo
      },
      page: page
    })
  }
  /**
   * 订单状态变更
   */
  changeOrderStatus({ orderId, linkId }) {
    return this.netService.send({
      server: manageService.productOrderController.changeOrderStatus,
      data: {
        orderId: orderId,
        linkId: linkId
      }
    })
  }
  /**
   * 根据订单id获取订单前期流程
   */
  getPreProcess({ orderId }) {
    return this.netService.send({
      server: manageService.productOrderController.getPreProcess,
      data: {
        orderId: orderId
      }
    })
  }
}
