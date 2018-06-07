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
}