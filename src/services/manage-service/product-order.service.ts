import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class ProductOrderService {
    @Inject(NetService)
    private netService: NetService

    createOrder(data) {
        return this.netService.send({
            server: manageService.productOrderController.createOrder,
            data
        })
    }
    /**
     * 根据用户ID获取用户订单
     * @param personalId 用户ID
     */
    getOrder(personalId){
        return this.netService.send({
            server: manageService.productOrderController.getOrder,
            data:{
                id: personalId
            }
        })
    }
}
