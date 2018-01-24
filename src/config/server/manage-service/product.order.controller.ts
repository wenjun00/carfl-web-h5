import { requestType } from '~/config/enum.config'

const SERVICE = 'manage-service'
const CONTROLLER = 'productOrder'

export default {
    /**
     * 进件模块 --订单交接查询
     */
    getOrderHandover: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getOrderHandover',
        type: requestType.Get
    },
    /**
     * 进件模块 - 订单交接 - 交接记录查询
     */
    findOrderHandoverHistory: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'findOrderHandoverHistory',
        type: requestType.Get
    }
}