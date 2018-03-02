import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'refundApplicationController'

export default {
    /**
     * 确认付款
     */
    comfireRefund: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'comfireRefund',
      type: requestType.Post
    },
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
    },
    /**
     * 证件号、订单号、客户姓名查询订单/账户/付款信息
     */
    getAllMessageByParams: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getAllMessageByParams',
        type: requestType.Get
    },
    /**
     * 保存/保存并提交付款申请
     */
    saveSubmitApplication: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'saveSubmitApplication',
        type: requestType.Post
    },
    /**
     * 获取付款明细项
     */
    getRefundItems: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getRefundItems',
        type: requestType.Get
    },
    /**
     * 进件，财务----付款记录查询/付款查询
     */
    getRefundRecord: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getRefundRecord',
        type: requestType.Get
    }
}