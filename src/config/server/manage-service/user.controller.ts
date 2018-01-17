import { requestType } from '~/config/enum.config'

const SERVICE = 'manage-service'
const CONTROLLER = 'user'

export default {
  /**
   * 分页查询角色列表
   */
  getUsersByDeptPage: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getUsersByDeptPage',
    type: requestType.Get
  }
}