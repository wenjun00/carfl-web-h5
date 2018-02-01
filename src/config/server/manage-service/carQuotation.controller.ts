// 经销商报价
import { requestType } from '~/config/enum.config'

const SERVICE = 'manage-service'
const CONTROLLER = 'carQuotation'

export default {
    /**
     * 查询供应商报价
     */
    getCarQuotationByConditionPage: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getCarQuotationByConditionPage',
        type: requestType.Get
    },
    /**
     * 创建供应商报价
     */
    createCarQuotation: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'createCarQuotation',
        type: requestType.Post
    },
    /**
    * 删除供应商报价
    */
    deleteCarQuotation: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'deleteCarQuotation',
        type: requestType.Delete
    },
    /**
     * 修改供应商报价
     */
    updateCarQuotation: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'updateCarQuotation',
        type: requestType.Post
    }
}