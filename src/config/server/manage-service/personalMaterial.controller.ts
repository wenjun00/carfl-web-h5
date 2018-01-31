// 客户素材管理controller
import { requestType } from '~/config/enum.config'

const SERVICE = 'manage-service'
const CONTROLLER = 'personalMaterial'

export default {
    /**
     * 分页查询客户素材
     */
    getAllPersonalMaterial: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getAllPersonalMaterial',
        type: requestType.Get
    },
    /**
     * 新增修改客户素材
     */
    createOrModifyPersonalMaterial: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'createOrModifyPersonalMaterial',
        type: requestType.Post
    },
    /**
     * 必传/不必传
     */
    isNecessary: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'isNecessary',
        type: requestType.Put
    },
    /**
     * 必传/不必传
     */
    select: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'select',
        type: requestType.Put
    },
    /**
     * 删除客户素材
     */
    deletePersonalMaterial: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'deletePersonalMaterial',
        type: requestType.Delete
    },
    /**
    * 展示全部客户素材
    */
    getAllPersonalMaterialNoPage: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getAllPersonalMaterialNoPage',
        type: requestType.Get
    }
}