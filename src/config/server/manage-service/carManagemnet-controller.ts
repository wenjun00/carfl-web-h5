//车辆管理 car-controller
import { requestType } from '~/config/enum.config'
const SERVICE = 'manage-service'
const CONTROLLER = 'carManagement'
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