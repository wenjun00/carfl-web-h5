// 查询订单合同
import { requestType } from "~/config/enum.config";
const SERVICE = 'service-manage'
const CONTROLLER = 'contractDetailsController'



export default {
    /**
     *  查看订单合同
     */
    getContractDetailsListByOrderId: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getContractDetailsListByOrderId',
        type: requestType.Get
    },
   

}