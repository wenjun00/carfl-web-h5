import { requestType } from "~/config/enum.config";
const SERVICE = 'service-manage'
const CONTROLLER = 'appCustomer'

export default {
  /**
   * 获取客户订单状态
   */
  checkCustomerType: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'checkCustomerType',
    type: requestType.Get
  },
  /**
   * 领取客户订单
   */
  customerReservation: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'customerReservation',
    type: requestType.Get
  }
}
