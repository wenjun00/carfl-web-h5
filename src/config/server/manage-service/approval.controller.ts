import { requestType } from '~/config/enum.config'
const SERVICE = 'manage-service'
const CONTROLLER = 'approval'
export default {
  /**
   * 分页查询审核资源池
   */
  auditResourcePool: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'auditResourcePool',
    type: requestType.Get
  },
  /**
   * 领取订单到我的审核
   */
  batchReceiveApproval: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'batchReceiveApproval',
    type: requestType.Get
  },
  /**
   * 我的审核
   */
  getMyApprovalOrder: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getMyApprovalOrder',
    type: requestType.Get
  },
  /**
   * 订单查询、内审、黑名单、灰名单
   */
  approvalOrderSearch: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'approvalOrderSearch',
    type: requestType.Get
  },
  /**
   * 内审、黑名单、灰名单移出
   */
  removeRiskStatus: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'removeRiskStatus',
    type: requestType.Get
  },
  /**
   * 审核记录表查询
   */
  getAuditRecord: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAuditRecord',
    type: requestType.Get
  }
}