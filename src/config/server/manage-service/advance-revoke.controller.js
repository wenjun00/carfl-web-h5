import { requestType } from '~/config/enum.config';
var SERVICE = 'service-manage';
var CONTROLLER = 'advanceRevokeController';
export default {
    /**
     * 获取客户提前收回账单信息
     */
    getAdvanceRevokeBillInfo: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getAdvanceRevokeBillInfo',
        type: requestType.Get
    },
    /**
     * 获取客户提前收回列表
     */
    getAdvanceRevokeList: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getAdvanceRevokeList',
        type: requestType.Get
    },
    /**
     * 客户划扣记录
     */
    getCustomerDeductionRecord: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getCustomerDeductionRecord',
        type: requestType.Get
    },
    /**
     * 获取已上传资料
     */
    getHaveUploadedResources: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getHaveUploadedResources',
        type: requestType.Get
    },
    /**
     * 客户还款记录详情
     */
    getPaymentRecordDetail: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getPaymentRecordDetail',
        type: requestType.Get
    },
    /**
     * 客户分期还款记录
     */
    getPaymentScheduleDetail: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getPaymentScheduleDetail',
        type: requestType.Get
    },
    /**
     * 确定
     */
    saveCollectMoneyHistory: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'saveCollectMoneyHistory',
        type: requestType.Post
    },
    /**
     * 保存草稿
     */
    saveCollectMoneyHistoryAsDraft: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'saveCollectMoneyHistoryAsDraft',
        type: requestType.Post
    },
    /**
     * 补传凭证资料
     */
    supplementUploadResources: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'supplementUploadResources',
        type: requestType.Post
    }
};
