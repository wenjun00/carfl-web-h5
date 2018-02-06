import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'productOrder'

export default {

  /**
   * 进件模块 --订单交接查询
   */
  getOrderHandover: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getOrderHandover',
    type: requestType.Get
  },
  /**
   * 进件模块 - 订单交接 - 交接记录查询
   */
  findOrderHandoverHistory: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findOrderHandoverHistory',
    type: requestType.Get
  },
  /**
   * 进件模块-订单交接
   */
  orderTransfer: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'orderTransfer',
    type: requestType.Get
  },
  /**
   * 根据订单号查询订单详情
   */
  findOrderInfoByOrderNumber: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findOrderInfoByOrderNumber',
    type: requestType.Get
  },
  /**
   * 进件模块--订单查询
   */
  orderSearch: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'orderSearch',
    type: requestType.Get
  },
  /**
  * 创建全额付款订单
  */
  createFullPaymentOrder: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createFullPaymentOrder',
    type: requestType.Post
  },
  /**
   * 创建融资租赁订单
   */
  saveFinanceApplyInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'saveFinanceApplyInfo',
    type: requestType.Post
  }

}