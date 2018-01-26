import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class CarService {
    @Inject(NetService)
    private netService: NetService

    /**
     * 获取所有车辆系列
     */
    findAllCarSeries(data?) {
        return this.netService.send({
            server: manageService.carController.findAllCarSeries,
            data: data
        })
    }
    /**
     * 查询车辆系列下所有车辆
     */
    findAllCarBySeries(data) {
        return this.netService.send({
            server: manageService.carController.findAllCarBySeries,
            data: data
        })
    }
    /**
     * 新增车辆
     */
    addVehicle(data) {
        return this.netService.send({
            server: manageService.carController.addVehicle,
            data: data
        })
    }
}