
import { requestType } from '~/config/enum.config'
const SERVICE = 'service-contract'
const CONTROLLER = 'contractController'
export default {
    /**
     * 生成合同
     */
    createContract: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'createContract',
        type: requestType.Get
    }
}