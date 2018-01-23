// 公司controller
import { requestType } from '~/config/enum.config'

const SERVICE = 'manage-service'
const CONTROLLER = 'company'

export default {
  /**
   * 获取所有公司
   */
  getAllCompany: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllCompany',
    type: requestType.Get
  }
}