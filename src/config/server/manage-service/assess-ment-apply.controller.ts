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
   *  评估申请 查看详情
   */
  findOrderInfoByOrderNumber:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findOrderInfoByOrderNumber',
    type: requestType.Get
  },
   /**
   *  评估申请撤回
   */
  withdrawStatus:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'withdrawStatus',
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
  },
  /**
   * 新增/修改车辆评估基本信息
   */
  saveAssessmentBasicInfo:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'saveAssessmentBasicInfo',
    type: requestType.Post
  },
  /**
   * 终止评估
   */
  terminationStatus:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'terminationStatus',
    type: requestType.Get
  },
  /**
   * 退件
   */
  backPieceStatus:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'backPieceStatus',
    type: requestType.Get
  },
  /**
   * 根据订单编号查询订单基础信息详情
   */
  findBasicInfoByOrderNumber:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findBasicInfoByOrderNumber',
    type: requestType.Get
  }
}
