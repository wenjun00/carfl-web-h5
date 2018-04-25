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


}
