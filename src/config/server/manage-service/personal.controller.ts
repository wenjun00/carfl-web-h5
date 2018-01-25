// 客户信息
import { requestType } from '~/config/enum.config'

const SERVICE = 'manage-service'
const CONTROLLER = 'personal'

export default {
    /**
     * 根据客户三项查询历史订单
     */
    getCustomerHistoryFinanceInfo: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getCustomerHistoryFinanceInfo',
        type: requestType.Get
    }
}