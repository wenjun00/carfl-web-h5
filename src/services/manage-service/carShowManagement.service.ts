import { NetService } from '~/utils/net.service' 
import { Inject, Debounce } from "~/core/decorator"; 
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class carShowManagementService {
    @Inject(NetService)
    private netService: NetService

    getTopTenCarBrandList() {
        return this.netService.send({
            server: manageService.carShowManagementController.getTopTenCarBrandList,
        })
    }
    getAllCarBrandList() {
        return this.netService.send({
            server: manageService.carShowManagementController.getAllCarBrandList,
        })
    }
    getGoodCarShowModelList() {
        return this.netService.send({
            server: manageService.carShowManagementController.getGoodCarShowModelList,
        })
    }
    /**
     * 根据品牌id 获取当前品牌车辆
     */
    getCarShowModelListByBrandId(data) {
        return this.netService.send({
            server: manageService.carShowManagementController.getCarShowModelListByBrandId,
            data
        })
    }
}