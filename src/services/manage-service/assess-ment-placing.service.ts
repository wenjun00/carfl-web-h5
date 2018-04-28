import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import {FilterService} from '~/utils/filter.service'
export class AssessMentPlacingService {
    @Inject(NetService)
    private netService: NetService
    /**
     * 押品入库查询
     */
    orderWarehousingSerach(data,page) {
        return this.netService.send({
            server: manageService.assessmentplacing.orderWarehousingSerach,
            data: data,
            page:page
        })
    }
    /**
     * 押品出库查询
     */
    orderPlacingSerach(data,page) {
        return this.netService.send({
            server: manageService.assessmentplacing.orderPlacingSerach,
            data: data,
            page:page
        })
    }
    /**
     * 入库详情查看
     */
    findWarehousingInfoByWarehousingId(data) {
        return this.netService.send({
            server: manageService.assessmentplacing.findWarehousingInfoByWarehousingId,
            data: data,
        })
    }
    /**
     * 入库点击确定
     */
    createWarehousingOrder(data) {
        return this.netService.send({
            server: manageService.assessmentplacing.createWarehousingOrder,
            data: data,
        })
    }
     /**
     * 入库点击确定
     */
    findAllAssessmentPlacingType() {
        return this.netService.send({
            server: manageService.assessmentplacing.findAllAssessmentPlacingType,
        })
    }










 
}
