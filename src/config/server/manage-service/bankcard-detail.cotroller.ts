//待办事项管理 backlog-controller
import { requestType } from '~/config/enum.config'
const SERVICE = 'service-manage'
const CONTROLLER = 'bankDetail'
export default {
  /**
   * 查询银行卡信息查询
   */
  getAllBankCards: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllBankCards',
    type: requestType.Get
  }
}