import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class CarService {
    @Inject(NetService)
    private netService: NetService

    /**
     * 获取所有公司
     */
    findAllCarSeries(data?) {
        return this.netService.send({
            server: manageService.carController.findAllCarSeries,
            data: data
        })
    }
}