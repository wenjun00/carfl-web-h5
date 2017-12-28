import { requestType } from '~/config/enum.config'

const CONTROLLER = 'role'

export const roleController = {
  /**
   * 创建角色
   */
  createRole: {
    controller: CONTROLLER,
    action: 'createRole',
    type: requestType.Post
  },
  /**
   * 删除角色
   */
  deleteRole: {
    controller: CONTROLLER,
    action: 'deleteRole',
    type: requestType.Delete
  },
  /**
   * 获取全部角色
   */
  getAllRoles: {
    controller: CONTROLLER,
    action: 'getAllRoles',
    type: requestType.Get
  },
  /**
   * 获取角色
   */
  getRole: {
    controller: CONTROLLER,
    action: 'getRole',
    type: requestType.Get
  },
  /**
   * 更新角色
   */
  updateRole: {
    controller: CONTROLLER,
    action: 'updateRole',
    type: requestType.Put
  }
}
