// 查询订单合同
import { requestType } from "~/config/enum.config";
const SERVICE = 'service-manage'
const CONTROLLER = 'contractDetailsController'



export default {
    /**
     *  查看订单合同
     */
    getOrderContractListByOrderNumber: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getOrderContractListByOrderNumber',
        type: requestType.Get
    },
    /**
     *  查看订单合同
     */
    getOrderContractListByOrderId: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getOrderContractListByOrderId',
        type: requestType.Get
    },
   

}