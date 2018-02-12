// 客户信息
import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'personal'

export default {
  /**
   * 根据客户三项查询历史订单
   */
  getCustomerHistoryFinanceInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCustomerHistoryFinanceInfo',
    type: requestType.Get
  },
  /**
   * 查询客户信息
   */
  getPersonalMessage: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getPersonMessage',
    type: requestType.Get
  },
  /**
   * 客户号获取开户信息
   */
  getBankByClientNumber: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getBankByClientNumber',
    type: requestType.Get
  },
  /**
   * 获取客户开户列表
   */
  getCustomerAccountList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCustomerAccountList',
    type: requestType.Get
  }
}