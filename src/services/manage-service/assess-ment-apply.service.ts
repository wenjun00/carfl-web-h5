import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class AssessMentApplyService {
    @Inject(NetService)
    private netService: NetService
    /**
     * 评估申请订单查询接口
     */
    orderSearch(data) {
        return this.netService.send({
            server: manageService.assessmentapply.orderSearch,
            data: data
        })
    }
}