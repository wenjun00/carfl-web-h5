import { requestType } from '~/config/enum.config';
var SERVICE = 'service-manage';
var CONTROLLER = 'advancePayoffController';
export default {
    /**
     * 获取客户提前结清账单信息
     */
    getAdvancePayoffBillInfo: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getAdvancePayoffBillInfo',
        type: requestType.Get
    },
    /**
     * 获取客户提前结清列表
     */
    getAdvancePayoffList: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getAdvancePayoffList',
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
