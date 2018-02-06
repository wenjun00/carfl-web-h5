import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'roleReso'

export default {
  /**
   * 重置资源图标
   */
  resetResoIcon: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'resetResoIcon',
    type: requestType.Get
  },
  /**
   * 重置资源名称
   */
  resetResoName: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'resetResoName',
    type: requestType.Get
  },
  /**
   * 修改资源图标
   */
  modifyResoIcon: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'modifyResoIcon',
    type: requestType.Post
  },
  /**
   * 修改资源名称
   */
  modifyResoName: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'modifyResoName',
    type: requestType.Post
  },
  /**
   * 查询所有角色资源
   */
  getAllResource: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllResource',
    type: requestType.Post
  },
  /**
  * 根据父id查询子类
  */
  getSonReso: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getSonReso',
    type: requestType.Get
  }
}