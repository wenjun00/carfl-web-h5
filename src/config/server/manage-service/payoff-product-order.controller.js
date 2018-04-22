import { requestType } from '~/config/enum.config';
var SERVICE = 'service-manage';
var CONTROLLER = 'payoffProductOrderController';
export default {
    /**
     * 客户扣款记录
     */
    getCustomerDeductionRecord: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getCustomerDeductionRecord',
        type: requestType.Get
    },
    /**
     * 获取已未结清订单信息
     */
    getPayoffProductOrders: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getPayoffProductOrders',
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
     * 补传凭证资料
     */
    supplementUploadResources: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'supplementUploadResources',
        type: requestType.Post
    }
};
