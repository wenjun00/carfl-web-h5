// 产品计划管理期数service
import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class ProductSeriesController {
    @Inject(NetService)
    private netService: NetService

    /**
     * 新增/修改产品系列
     */
    createOrModifyProductSeries(data) {
        return this.netService.send({
            server: manageService.productSeriesController.createOrModifyProductSeries,
            data: data
        })
    }
    /**
     * 
     *  删除产品系列
     */
    deleteProductSeries({ seriesId }) {
        return this.netService.send({
            server: manageService.productSeriesController.deleteProductSeries,
            seriesId: seriesId
        })
    }

}
