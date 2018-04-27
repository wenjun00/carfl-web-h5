// 公司controller
import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'companyAccount'

export default {
    /**
     * 分页查询所有企业开户信息
     */
    getAllAccountWithPage: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getAllAccountWithPage',
        type: requestType.Get
    },
    /**
     * 新增企业开户
     */
    companyOpenAccount: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'companyOpenAccount',
        type: requestType.Post
    },
    /**
     * 修改企业开户信息
     */
    editAccount: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'editAccount',
        type: requestType.Put
    },
    /**
   * 查看单个企业开户信息
   */
    finAccountDetail: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'finAccountDetail',
        type: requestType.Get
    }
}
