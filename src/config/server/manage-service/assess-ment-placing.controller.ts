// 押品入库
import { requestType } from '~/config/enum.config'
const SERVICE = 'service-manage'
const CONTROLLER = 'assessmentplacing'
export default {
  /**
   * 押品入库查询
   */
  orderWarehousingSerach: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'orderWarehousingSerach',
    type: requestType.Get
  },
  /**
   * 押品出库查询
   */
  orderPlacingSerach: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'orderPlacingSerach',
    type: requestType.Get
  },
   /**
   * 入库详情查看
   */
  findWarehousingInfoByWarehousingId: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findWarehousingInfoByWarehousingId',
    type: requestType.Get
  },
   /**
   * 入库点击确定
   */
  createWarehousingOrder: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createWarehousingOrder',
    type: requestType.Post
  },
   /**
   * 查询全部状态措施内容接口
   */
  findAllAssessmentPlacingType: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findAllAssessmentPlacingType',
    type: requestType.Get
  },
  /**
   * 根据ID查询出库详情
   */
  findPlacingByPlacingId:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findPlacingByPlacingId',
    type: requestType.Get
  },
  /**
   * 押品出库
   */
  createPlacingOrder:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createPlacingOrder',
    type: requestType.Post
  }
}
