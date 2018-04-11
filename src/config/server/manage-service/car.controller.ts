// 车辆管理
import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
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
  },
  /**
   * 所有品牌
   */
  getAllBrand: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllBrand',
    type: requestType.Get
  },
  /**
   * 所有型号
   */
  getAllModel: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllModel',
    type: requestType.Get
  },
  /**
  * 所有系列
  */
  getAllSeries: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllSeries',
    type: requestType.Get
  },
  /**
   * 根据车辆id获取车辆系列
   */
  getSeriesByBrandId: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getSeriesByBrandId',
    type: requestType.Get
  },
  /**
   * 新增系列
   */
  createCarSeries: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createCarSeries',
    type: requestType.Post
  },
  /**
   * 根据车辆系列id获取车辆品牌
   */
  getCarBrandBySeriesId: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCarBrandBySeriesId',
    type: requestType.Get
  },
  /**
   * 新增车辆品牌
   */
  createCarBrand: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createCarBrand',
    type: requestType.Post
  },
  /**
   * 修改车辆品牌和系列
   */
  modifyCarInfo : {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'modifyCarInfo',
    type: requestType.Put
  }
}
