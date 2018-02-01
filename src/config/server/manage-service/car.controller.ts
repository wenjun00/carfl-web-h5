// 车辆管理
import { requestType } from '~/config/enum.config'

const SERVICE = 'manage-service'
const CONTROLLER = 'carManagement'

export default {
    /**
     * 查询所有车辆
     */
    findAllCarSeries: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'findAllCarSeries',
        type: requestType.Get
    },
    /**
   * 查询车辆系列下所有车辆
   */
    findAllCarBySeries: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'findAllCarBySeries',
        type: requestType.Get
    },
    /**
   * 新增车辆
   */
    addVehicle: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'addVehicle',
        type: requestType.Post
    },
    /**
     * 搜索
     */
    seachCar: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'findAllCarBySeries',
        type: requestType.Get
    },
    /**
    * 修改车辆信息
    */
    updateVehicle: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'updateVehicle',
        type: requestType.Post
    }
}