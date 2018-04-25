// 评估申请
import { requestType } from '~/config/enum.config'
const SERVICE = 'service-manage'
const CONTROLLER = 'assessmentapply'
export default {
  /**
   * 评估申请订单查询接口
   */
  orderSearch: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'orderSearch',
    type: requestType.Get
  },
  /**
   *  评估任务池订单查询
   */
  orderPoolSearch: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'orderPoolSearch',
    type: requestType.Get
  },
  /**
   *  更改订单状态
   */
  updateOrderStatus:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateOrderStatus',
    type: requestType.Get
  },
  /**
   *  评估订单查询
   */
  orderBasicSearch:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'orderBasicSearch',
    type: requestType.Get
  },
  /**
   * 根据订单编号处理订单
   */
  beginOrderAssess:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'beginOrderAssess',
    type: requestType.Get
  }
}
