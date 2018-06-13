import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class ContractDetailsControllerService {
    @Inject(NetService)
    private netService: NetService


    /**
     * 获取还款详情
     */
    getContractDetailsListByOrderId(orderId){
        return this.netService.send({
            server: manageService.contractDetailsController.getContractDetailsListByOrderId,
            data:{
              orderId: orderId
            }
        })
    }
}