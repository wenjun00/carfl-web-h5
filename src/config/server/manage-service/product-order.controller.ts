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
        action: 'createOrderByH5',
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
    },
     /**
     * 获取订单基本数据
     */
    findOrderInfoByOrderNumber: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'findOrderInfoByOrderNumber',
        type: requestType.Get
    },
    /****
     * 获取支持银行
     */
    getBankCodeList: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getBankCodeList',
        type: requestType.Get
    }
    

}