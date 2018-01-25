// 车辆管理
import { requestType } from '~/config/enum.config'

const SERVICE = 'manage-service'
const CONTROLLER = 'carManagement'

export default {
    /**
     * 查询所有车辆系列
     */
    findAllCarSeries: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'findAllCarSeries',
        type: requestType.Get
    }
}