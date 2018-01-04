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
  },  
  /**
   * 创建机构
   */
  createOrganization: {
    controller: CONTROLLER,
    action: 'createOrganization',
    type: requestType.Post
  },
  /**
   * 修改机构
   */
  updateOrganization: {
    controller: CONTROLLER,
    action: 'updateOrganization',
    type: requestType.Put
  },
  /**
   * 删除机构
   */
  deleteOrganization: {
    controller: CONTROLLER,
    action: 'deleteOrganization',
    type: requestType.Delete
  }
}
