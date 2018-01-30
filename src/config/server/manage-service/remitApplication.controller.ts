//产品系列管理
import { requestType } from '~/config/enum.config'
const SERVICE = 'manage-service'
const CONTROLLER = 'remitApplicationController'
export default {
  /**
   * 查询减免或冻结列表
   */
  selectApplyForReliefHistory: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'selectApplyForReliefHistory',
    type: requestType.Get
  },
  /**
   * 减免撤销
   */
  remitCanceled: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'remitCanceled',
    type: requestType.Delete
  },
  /**
   * 解冻
   */
  freezeCancel: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'freezeCancel',
    type: requestType.Delete
  }
}