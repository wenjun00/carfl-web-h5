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
    /***
     * 根据车辆id 获取当前品牌车辆
     */
    getCarShowModelListByBrandId: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getCarShowModelListByBrandId',
        type: requestType.Get
    },
    /***
    * 所有车辆接口
    */
   getCarShowModelListByName: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getCarShowModelListByName',
        type: requestType.Get
    },


}