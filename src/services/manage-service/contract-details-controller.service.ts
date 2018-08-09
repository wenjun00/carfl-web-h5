import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class ContractDetailsControllerService {
    @Inject(NetService)
    private netService: NetService


    /**
     * 获取订单合同数据
     */
    getOrderContractListByOrderNumber(orderNumber) {
        return this.netService.send({
            server: manageService.contractDetailsController.getOrderContractListByOrderNumber,
            data: {
                orderNumber: orderNumber
            }
        })
    }
    /**
    * 获取订单合同数据
    */
    getOrderContractListByOrderId(id) {
        return this.netService.send({
            server: manageService.contractDetailsController.getOrderContractListByOrderId,
            data: {
                orderId: id
            }
        })
    }
    /**
    * 获取交车合同
    */
    getCarContractListByOrderId(id) {
        return this.netService.send({
            server: manageService.contractDetailsController.getCarContractListByOrderId,
            data: {
                orderId: id
            }
        })
    }
}
