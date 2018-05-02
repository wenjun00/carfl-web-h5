// 客户信息 
import { requestType } from '~/config/enum.config'
const SERVICE = 'service-manage'
const CONTROLLER = 'personal'

export default {
    /**
     * 根据客户三项查询历史订单
     */
    getCustomerHistoryFinanceInfo: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getCustomerHistoryFinanceInfo',
        type: requestType.Get
    },
    /**
     * 查询客户信息
     */
    getPersonalMessage: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getPersonMessage',
        type: requestType.Get
    },
    /**
     * 客户号获取开户信息
     */
    getBankByClientNumber: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getBankByClientNumber',
        type: requestType.Get
    },
    /**
     * 获取客户开户列表
     */
    getCustomerList: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getCustomerList',
        type: requestType.Get
    },
    /**
     * 获取客户签约列表
     */
    getCustomerSignList: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getCustomerSignList',
        type: requestType.Get
    },
    /**
     * 修改结算通道
     */
    modifySettleChannel: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'modifySettleChannel',
        type: requestType.Put
    },
    /**
     * 进件模块-客户资料
     */
    getCustomerDataOrder: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getCustomerDataOrder',
        type: requestType.Get
    },
    /**
     * 上传客户审批资料
     */
    uploadPersonalApproveFile: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'uploadPersonalApproveFile',
        type: requestType.Post
    },
    /**
     * 客户开户手机验证码
     */
    customerOpenAccountVerificationPhone: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'customerOpenAccountVerificationPhone',
        type: requestType.Get
    },
    /**
     * 客户开户
     */
    customerOpenAccount: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'customerOpenAccount',
        type: requestType.Post
    },
    /**
     * 新增意向客户
     */
    createCustomer: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'createCustomer',
        type: requestType.Post
    }
}