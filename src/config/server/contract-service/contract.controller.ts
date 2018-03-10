
import { requestType } from '~/config/enum.config'
const SERVICE = 'service-contract'
const CONTROLLER = 'contractController'
export default {
    /**
     * 生成合同
     */
    createOneContract: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'createOneContract',
        type: requestType.Get
    }
}