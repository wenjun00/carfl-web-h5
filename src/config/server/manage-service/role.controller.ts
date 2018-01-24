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
  },
  /**
   * 修改角色
   */
  updateRole: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateRole',
    type: requestType.Post
  },
  /**
   * 新增角色
   */
  createRole: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createRole',
    type: requestType.Post
  },
  /**
   * 删除角色
   */
  deleteRole: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteRole',
    type: requestType.Delete
  },
  /**
   * 根据角色获取用户列表
   */
  getUserByRoleIdPage: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getUserByRoleIdPage',
    type: requestType.Get
  }
}