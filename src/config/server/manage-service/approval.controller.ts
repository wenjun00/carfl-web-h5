import { requestType } from '~/config/enum.config'
const SERVICE = 'manage-service'
const CONTROLLER = 'approval'
export default {
  /**
   * 分页查询审核资源池
   */
  auditResourcePool: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'auditResourcePool',
    type: requestType.Get
  }
}