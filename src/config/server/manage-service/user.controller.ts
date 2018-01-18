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
  },
  /**
   * 新增用户
   */
  createUser: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createUser',
    type: requestType.Post
  },
  /**
   * 修改用户
   */
  updateUser: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateUser',
    type: requestType.Post
  }
}