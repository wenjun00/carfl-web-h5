// 公司controller
import { requestType } from '~/config/enum.config'

const SERVICE = 'manage-service'
const CONTROLLER = 'company'

export default {
    /**
     * 获取所有公司
     */
    getAllCompany: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getAllCompany',
        type: requestType.Get
    },
    /**
    * 查询分公司信息
    */
    getAllCompanyWithPage: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getAllCompanyWithPage',
        type: requestType.Get
    },
    /**
    * 停用/启用
    */
    disableOrEnable: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'disableOrEnable',
        type: requestType.Put
    },
    /**
    * 新增/修改公司信息
    */
    createOrModifyCompany: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'createOrModifyCompany',
        type: requestType.Post
    }
}