import { requestType } from '~/config/enum.config'

const CONTROLLER = 'operators'
export const operatorController = {
  /**
   * 获取角色的所有用户简略信息
   */
  orgSimpleListByRole: {
    controller: CONTROLLER,
    action: 'orgSimpleListByRole',
    type: requestType.Get
  },
  /**
  * 获取组织下的所有用户简略信息
  */
  orgSimpleListByOrg: {
    controller: CONTROLLER,
    action: 'orgSimpleListByOrg',
    type: requestType.Get
  },
  /**
   * 创建新用户
   */
  createOperator: {
    controller: CONTROLLER,
    action: 'createOperator',
    type: requestType.Post
  },
  /**
   * 修改用户
   */
  updateOperator: {
    controller: CONTROLLER,
    action: 'modify',
    type: requestType.Post
  }
}
