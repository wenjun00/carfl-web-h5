// 系统参数controller
import { requestType } from '~/config/enum.config'

const SERVICE = 'manage-service'
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
   * 创建修改系统参数
   */
  createSystemParameter: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createSystemParameter',
    type: requestType.Post
  }
}