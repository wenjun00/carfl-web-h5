import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'withdrawApplicationController'

export default {
  /**
   * 分页查询角色列表
   */
  getSaleCollectMoneyApplicationInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getSaleCollectMoneyApplicationInfo',
    type: requestType.Get
  },
  /**
   * 获取提前结清信息
   */
  getAdvancePayoffApplicationInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAdvancePayoffApplicationInfo',
    type: requestType.Get
  },
  /**
 * 获取提前收回信息
 */
  getAdvanceRevokeApplicationInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAdvanceRevokeApplicationInfo',
    type: requestType.Get
  },
  /**
   * 获取客户订单信息
   */
  getPersonalProductOrderInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getPersonalProductOrderInfo',
    type: requestType.Get
  }
}