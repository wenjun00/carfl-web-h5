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
}
  