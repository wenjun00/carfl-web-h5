// 系统日志controller
import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'systemLogs'

export default {
  /**
   * 分页查询操作日志
   */
  querySystemLogsPage: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'querySystemLogsPage',
    type: requestType.Get
  }
}