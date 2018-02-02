import { requestType } from '~/config/enum.config'

const SERVICE = 'manage-service'
const CONTROLLER = 'roleReso'

export default {
    /**
     * 查询所有资源角色（模块功能 树结构）
     */
    getAllResource: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getAllResource',
        type: requestType.Post
    }
}