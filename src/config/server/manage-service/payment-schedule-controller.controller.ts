// 还款详情
import { requestType } from "~/config/enum.config";
const SERVICE = 'service-manage'
const CONTROLLER = 'paymentScheduleController'



export default {
    /**
     * 还款详情
     */
    getPaymentScheduleList: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getPaymentScheduleList',
        type: requestType.Get
    },
   

}