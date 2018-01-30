import { requestType } from '~/config/enum.config'

const SERVICE = 'manage-service'
const CONTROLLER = 'refundApplicationController'

export default {
  /**
   * 进件 付款审批
   */
  getApprovalRecord: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getApprovalRecord',
    type: requestType.Get
  },
  /**
   * 审批申请
   */
  getRefundApplicationById: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getRefundApplicationById',
    type: requestType.Get
  },
  /**
   * 通过付款申请（付款）
   */
  passRefundApplication: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'passRefundApplication',
    type: requestType.Get
  },
  /**
   * 退回付款申请（付款）
   */
  returnRefundApplication: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'returnRefundApplication',
    type: requestType.Get
  }
}