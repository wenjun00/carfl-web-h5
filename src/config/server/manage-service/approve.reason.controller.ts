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
        type: requestType.Get
    },
    /**
    * 审批原因模板下载
    */
    downloadApproveReasonTemplate: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'downloadApproveReasonTemplate',
        type: requestType.Get
    },
    /**
    * 新增审批原因
    */
    createApproveReason: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'createApproveReason',
        type: requestType.Post
    },
    /**
    * 导入审批原因
    */
    ImportApproveReason: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'ImportApproveReason',
        type: requestType.Get
    }
}