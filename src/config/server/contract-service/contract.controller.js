import { requestType } from '~/config/enum.config';
var SERVICE = 'service-contract';
var CONTROLLER = 'contractController';
export default {
    /**
     * 生成合同
     */
    createOneContract: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'createOneContract',
        type: requestType.Get
    },
    /**
     * 合同资料的上传
     */
    uploadContractResource: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'uploadContractResource',
        type: requestType.Post
    },
    /**
     * 查看订单合同资料
     */
    getContractResourceAll: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getContractResourceAll',
        type: requestType.Get
    },
};
