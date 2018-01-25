import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class PersonalService {
    @Inject(NetService)
    private netService: NetService

    /**
     * 根据客户三项查询历史订单
     */
    getCustomerHistoryFinanceInfo(data?) {
        return this.netService.send({
            server: manageService.personalController.getCustomerHistoryFinanceInfo,
            data: data
        })
    }
}