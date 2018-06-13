// 进件 
import { requestType } from "~/config/enum.config";
const SERVICE = 'service-manage'
const CONTROLLER = 'productOrder'



export default {
    /**
     * 进件
     */
    createOrder: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'createOrder',
        type: requestType.Post
    },
    /**
     * 获取订单
     */
    getOrder: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getAppProductOrderInfo',
        type: requestType.Get
    }

}