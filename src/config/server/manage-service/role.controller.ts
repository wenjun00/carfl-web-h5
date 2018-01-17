import { requestType } from '~/config/enum.config'

const SERVICE = 'manage-service'
const CONTROLLER = 'role'

export default {
  /**
   * 分页查询角色列表
   */
  queryRolePage: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryRolePage',
    type: requestType.Get
  }
}