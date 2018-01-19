// 系统参数controller
import { requestType } from '~/config/enum.config'

const SERVICE = 'manage-service'
const CONTROLLER = 'systemLogs'

export default {
  /**
   * 分页查询系统参数
   */
  querySystemParameterPage: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'querySystemParameterPage',
    type: requestType.Get
  }
}