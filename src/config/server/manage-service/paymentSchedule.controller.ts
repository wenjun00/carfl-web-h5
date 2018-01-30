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
  },
  /**
   * 还款详情
   */
  getPaymentRecordDetail: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getPaymentRecordDetail',
    type: requestType.Get
  },
  /**
   * 还款总揽
   */
  getRepaymentOverview: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getRepaymentOverview',
    type: requestType.Get
  }
}