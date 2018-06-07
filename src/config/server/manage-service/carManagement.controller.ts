// 车辆详情
import { requestType } from "~/config/enum.config";
const SERVICE = 'service-manage'
const CONTROLLER = 'carManagement'



export default {
  /**
   * 根据车辆id查询车辆属性列表
   */
  getCarParamList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCarParamList',
    type: requestType.Get
  },
  /***
   * 获取车辆信息
   */
  getCarDetail: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCarDetail',
    type: requestType.Get
  },
  /***
   * 通过carId查找出栏目信息
   */
  getCarColumnCollectModel: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCarColumnCollectModel',
    type: requestType.Get
  },


}