import { requestType } from '~/config/enum.config'

const CONTROLLER = 'resource'

export const resourceController = {
  /**
   * 获取所有资源
   */
  getAllResources: {
    controller: CONTROLLER,
    action: 'getAllResources',
    type: requestType.Get
  }
}
