import { requestType } from '~/config/enum.config'
const SERVICE = 'service-report'
const CONTROLLER = 'report'
export default {
  /**
   * 查询清结算日报表
   */
  getSettlementReport: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getSettlementReport',
    type: requestType.Get
  }
}