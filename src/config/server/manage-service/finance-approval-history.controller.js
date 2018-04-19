import { requestType } from '~/config/enum.config';
var SERVICE = 'service-manage';
var CONTROLLER = 'financeApprovalHistoryController';
export default {
    /**
     * 收款审批记录查询
     */
    getWithdrawApprovalList: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getWithdrawApprovalList',
        type: requestType.Get
    },
    /**
     * 审批通过
     */
    withdrawApplicationApprovalPass: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'withdrawApplicationApprovalPass',
        type: requestType.Post
    },
    /**
     * 审批拒绝
     */
    withdrawApplicationApprovalRefuse: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'withdrawApplicationApprovalRefuse',
        type: requestType.Post
    },
    /**
     * 查看详情
     */
    withdrawApplicationDetail: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'withdrawApplicationDetail',
        type: requestType.Get
    }
};
