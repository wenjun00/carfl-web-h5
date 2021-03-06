import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class ProductService {
    @Inject(NetService)
    private netService: NetService

    /**
     * 
     * 查询车辆信息首付月供
     */
    getCarProductResultModelList(data) {
        return this.netService.send({
            server: manageService.productController.getCarProductResultModelList,
            data
        })
    }
}