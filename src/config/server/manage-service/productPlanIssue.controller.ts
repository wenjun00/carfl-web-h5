//产品计划期数管理
import { requestType } from '~/config/enum.config'
const SERVICE = 'manage-service'
const CONTROLLER = 'productPlanIssue'
export default {
    /**
     * 新增/修改产品计划期数管理
     */
    createOrModifyProductPlan: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'createOrModifyProductPlan',
        type: requestType.Post
    },
    /**
     * 分页查询某一产品下的所有计划
     */
    getAllProductPlan: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getAllProductPlan',
        type: requestType.Get
    },
    /**
     * 发布
     */
    publish: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'publish',
        type: requestType.Put
    }
}