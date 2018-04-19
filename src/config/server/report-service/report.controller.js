import { requestType } from '~/config/enum.config';
var SERVICE = 'service-report';
var CONTROLLER = 'report';
export default {
    /**
     * 查询清结算日报表
     */
    getSettlementReport: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getSettlementReport',
        type: requestType.Get
    }
};
