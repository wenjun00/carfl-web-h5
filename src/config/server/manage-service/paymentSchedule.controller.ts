// 客户信息
import { requestType } from '~/config/enum.config'

const SERVICE = 'manage-service'
const CONTROLLER = 'paymentScheduleController'

export default {
  /**
   * 客户还款查询
   */
  getCustomerPayments: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCustomerPayments',
    type: requestType.Get
  }
}