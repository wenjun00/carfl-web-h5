import { requestType } from '~/config/enum.config';
var SERVICE = 'service-manage';
var CONTROLLER = 'productPackage';
export default {
    /**
     * 多条件分页查询产品包信息
     */
    getAllProductPackage: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getAllProductPackage',
        type: requestType.Get
    },
    /**
     * 删除产品包信息
     */
    deleteProductPackage: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'deleteProductPackage',
        type: requestType.Delete
    },
    /**
     * 下载产品包信息
     */
    downloadProductPackage: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'downloadProductPackage',
        type: requestType.Get
    },
    /**
     * 新增产品包信息
     */
    createProductPackage: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'createProductPackage',
        type: requestType.Post
    },
    /**
     * 查询所有产品包
     */
    getAllProductPackageNoPage: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getAllProductPackageNoPage',
        type: requestType.Get
    },
    /**
   * 下载模板
   */
    downloadTemplate: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'downloadTemplate',
        type: requestType.Get
    }
};
