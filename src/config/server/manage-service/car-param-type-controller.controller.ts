import { requestType } from '~/config/enum.config'
const SERVICE = 'service-manage'
const CONTROLLER = 'carParamTypeController'
export default {
  /**
   * 根据车辆ID获取所有的参数类型
   */
  getCarParamTypeByCarId: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCarParamTypeByCarId',
    type: requestType.Get
  },
  /**
 * 新增或者修改参数类型
 */
  saveOrUpdate: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'saveOrUpdate',
    type: requestType.Post
  },

}