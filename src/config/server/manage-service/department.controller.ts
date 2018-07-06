import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'department'

export default {
  /**
   * 获取组织机构
   */
  getAllDepartment: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllDepartment',
    type: requestType.Get
  },
 
}