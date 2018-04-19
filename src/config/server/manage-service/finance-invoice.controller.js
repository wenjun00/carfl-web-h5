//待办事项管理 backlog-controller
import { requestType } from '~/config/enum.config';
var SERVICE = 'service-manage';
var CONTROLLER = 'financeInvoiceController';
export default {
    /**
     * 财务开票列表
     */
    getFinanceInvoiceList: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getFinanceInvoiceList',
        type: requestType.Get
    }
};
