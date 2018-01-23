import { requestType } from '~/config/enum.config'
const SERVICE = 'manage-service'
const CONTROLLER = 'approveReason'
export default {
    /**
     * 分页查询审批原因
     */
    getAllApproveReason: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'getAllApproveReason',
      type:requestType.Get
    }
  }