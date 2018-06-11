// 首页
import { requestType } from "~/config/enum.config";
const SERVICE = 'service-manage'
const CONTROLLER = 'carShowManagement'



export default {
  /**
   * 首页品牌列表
   */
  getTopTenCarBrandList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getTopTenCarBrandList',
    type: requestType.Get
  },
  /**
   * 获取全部品牌
   */
  getAllCarBrandList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllCarBrandList',
    type: requestType.Get
  },
  /**
   * 获取热门车辆
   */
  getGoodCarShowModelList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getGoodCarShowModelList',
    type: requestType.Get
  },


  /**
   * 车辆列表
   */
  getCarShowModelListByBrandIdAndName: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCarShowModelListByBrandIdAndName',
    type: requestType.Get
  }

}