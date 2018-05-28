// 审批管理service
import { contractService } from '~/config/server/contract-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class ContractService {
    @Inject(NetService)
    private netService: NetService

    /**
     * 生成合同
     */
    createOneContract(data) {
        return this.netService.send({
            server: contractService.contractController.createOneContract,
            data:data,
            loading: true
        })
    }
  /**
   * 合同资料的上传
   */
  uploadContractResource(data) {
    return this.netService.send({
      server: contractService.contractController.uploadContractResource,
      data
    })
  }
  /**
   * 查看订单合同资料
   */
  getContractResourceAll(data) {
    return this.netService.send({
      server: contractService.contractController.getContractResourceAll,
      data
    })
  }
}
