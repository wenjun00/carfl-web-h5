
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
}
