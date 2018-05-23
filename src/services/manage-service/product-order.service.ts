import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { FilterService } from '~/utils/filter.service';

export class ProductOrderService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 获取订单交接列表
   */
  findTransferOrder(data, page) {
    const dateRange = FilterService.dateRanageFormat(data.dateRange)
    return this.netService.send({
      server: manageService.productOrderController.findTransferOrder,
      data:{
        startTime: dateRange.start,//开始时间
        endTime: dateRange.end,//结束时间
        personalName : data.personalName,//客户姓名
        orderNumber:data.orderNumber,//订单编号
        idCard  : data.idCard, // 客户证件号码
        tel   :data.tel,//客户联系号码
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
  // /**
  //  * 进件模块--订单查询
  //  */
  // orderSearch(data, page) {
  //   const dateRange = FilterService.dateRanageFormat(data.dateRange)
  //   return this.netService.send({
  //     server: manageService.productOrderController.orderSearch,
  //     data: {
  //       orderInfo: data.orderInfo,
  //       orderNumber:data.orderNumber,//请输入订单编号
  //       idCard: data.idCard, // 请输入客户证件号码
  //       tel:data.tel,//请输入客户联系号码
  //       startTime: dateRange.start,
  //       endTime: dateRange.end
  //     },
  //     page: page
  //   })
  // }
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
  @Debounce(1000)
  saveFinanceApplyInfo(data) {
    //data.customerModel.birthTime = FilterService.dateFormat(data.customerModel.birthTime)
    let dateStr = !!FilterService.dateFormat(data.personal.birthTime)?FilterService.dateFormat(data.personal.birthTime):null
    let personal = {...data.personal, birthTime: dateStr }

    let dataStr2 = !!FilterService.dateFormat(data.personalJob.accessCompanyTime)?FilterService.dateFormat(data.personalJob.accessCompanyTime):null
    let personalJob = {...data.personalJob, accessCompanyTime: dataStr2 }
    // console.log(Object.assign(data, { personal: { birthTime: dateStr } }), 11111111111111)
    return this.netService.send({
      server: manageService.productOrderController.saveFinanceApplyInfo,
      data: Object.assign(data, { personal }, {personalJob})
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

  getPurchaseInfoById(id){
    return this.netService.send({
      server: manageService.productOrderController.getPurchaseInfoById,
      data: {
        orderNumber: id
      }
    })
  }
}
