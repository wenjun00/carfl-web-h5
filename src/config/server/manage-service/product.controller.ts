import { requestType } from '~/config/enum.config'
const SERVICE = 'manage-service'
const CONTROLLER = 'product'

export default {
    /**
     * 配置产品流程--添加
     */
    configureProductProcessAdd: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'configureProductProcessAdd',
        type: requestType.Get
    },
    /**
     * 配置产品流程--删除
     */
    configureProductProcessDelete: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'configureProductProcessDelete',
        type: requestType.Get
    },
    /**
     * 配置产品流程--上下移动
     */
    configureProductProcessMove: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'configureProductProcessMove',
        type: requestType.Get
    },
    /**
     * 新增修改产品
     */
    createOrModifyProduct: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'createOrModifyProduct',
        type: requestType.Post
    },
    /**
     * 删除产品
     */
    deleteProduct: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'deleteProduct',
        type: requestType.Delete
    },
    /**
     * 查询所有产品 ---树形结构
     */
    getAllProduct: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getAllProduct',
        type: requestType.Get
    }

}