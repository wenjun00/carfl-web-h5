// 系统参数controller
import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'systemParameter'

export default {
  /**
   * 分页查询系统参数
   */
  querySystemParameterPage: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'querySystemParameterPage',
    type: requestType.Get
  },
  /**
   * 创建系统参数
   */
  createSystemParameter: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createSystemParameter',
    type: requestType.Post
  },
  /**
 * 修改系统参数
 */
  updateSystemParameter: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateSystemParameter',
    type: requestType.Post
  }
}