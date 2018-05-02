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
   *  领取/批量领取案件
   */
  batchReceive:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'batchReceive',
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
  },
  /**
   * 删除车辆评估订单
   */
  deleteOrderInfoByOrderId:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteOrderInfoByOrderId',
    type: requestType.Delete
  },
  /**
   *  新增/修改车辆评估申请订单
   */
  saveAssessmentApplyInfo:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'saveAssessmentApplyInfo',
    type: requestType.Post
  },
  /**
   * 已评估车辆订单查询
   */
  orderMortgageSearch:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'orderMortgageSearch',
    type: requestType.Get
  },
}
