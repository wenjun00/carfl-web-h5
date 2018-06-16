import { requestType } from "~/config/enum.config";
const SERVICE = 'service-manage'
const CONTROLLER = 'appCustomer'

export default {
  /**
   * 获取客户订单状态
   */
  getIntentionCustomerDetail: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getIntentionCustomerDetail',
    type: requestType.Get
  }

}
  