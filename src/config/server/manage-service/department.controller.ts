import { requestType } from '~/config/enum.config'

const SERVICE = 'manage-service'
const CONTROLLER = 'department'

export default {
  getAllDepartment: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllDepartment',
    type: requestType.Get
  }
}