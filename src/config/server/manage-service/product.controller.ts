// 车辆详情 根据选择 价格期数显示对应数据
import { requestType } from "~/config/enum.config";
const SERVICE = 'service-manage'
const CONTROLLER = 'product' 



export default {
    /**
     * 车辆详情3级联动选择价格
     */
    getCarProductResultModelList: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getCarProductResultModelList',
        type: requestType.Get
    },
   
}