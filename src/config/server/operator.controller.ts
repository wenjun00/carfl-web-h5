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
  }
}
