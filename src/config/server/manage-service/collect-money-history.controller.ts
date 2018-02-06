// 收款Controller
import { requestType } from '~/config/enum.config'
const SERVICE = 'service-manage'
const CONTROLLER = 'collectMoneyHistoryController'
export default {
  /**
   * 获取收款列表
   */
  collectMoneyHistoryList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'collectMoneyHistoryList',
    type: requestType.Get
  }
}