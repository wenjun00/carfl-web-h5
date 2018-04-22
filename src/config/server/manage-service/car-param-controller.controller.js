import { requestType } from '~/config/enum.config';
var SERVICE = 'service-manage';
var CONTROLLER = 'carParamController';
export default {
    /**
     *删除车辆参数
     */
    deleteCarParam: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'deleteCarParam',
        type: requestType.Delete
    },
    /**
   * 获取所有的车辆参数
   */
    findAll: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'findAll',
        type: requestType.Get
    },
    /**
   * 查询对应的车辆参数的类型的参数
   */
    getCarParamByCode: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getCarParamByCode',
        type: requestType.Get
    },
    /**
  * 新增或者修改车辆参数
  */
    saveOrUpdate: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'saveOrUpdate',
        type: requestType.Post
    }
};
