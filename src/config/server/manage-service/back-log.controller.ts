//待办事项管理 backlog-controller
import { requestType } from '~/config/enum.config'
const SERVICE = 'manage-service'
const CONTROLLER = 'backlog'
export default {
    /**
     * 角色待分配事项
     */
    roleAllocateBacklogs: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'roleAllocateBacklogs',
        type: requestType.Post
    }
}