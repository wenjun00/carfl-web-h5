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
    getAllCarBrandList: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'getAllCarBrandList',
      type: requestType.Get
  },
   
}