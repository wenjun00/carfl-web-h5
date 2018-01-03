import { requestType } from '~/config/enum.config'

const CONTROLLER = 'organization'
export const organizationController = {
  /**
   * 查询所有机构
   */
  getAllOrganizations: {
    controller: CONTROLLER,
    action: 'getAllOrganizations',
    type: requestType.Get
  }
}
