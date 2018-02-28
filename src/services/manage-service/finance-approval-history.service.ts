import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class FinanceApprovalHistoryService {
    @Inject(NetService)
    private netService: NetService
    /**
     * 收款审批记录查询
     */
    getWithdrawApprovalList(data, page) {
        return this.netService.send({
            server: manageService.financeApprovalHistoryController.getWithdrawApprovalList,
            data,
            page
        })
    }
    /**
     * 审批通过
     */
    withdrawApplicationApprovalPass(data) {
        return this.netService.send({
            server: manageService.financeApprovalHistoryController.withdrawApplicationApprovalPass,
            data
        })
    }
    /**
     * 审批拒绝
     */
    withdrawApplicationApprovalRefuse(data) {
        return this.netService.send({
            server: manageService.financeApprovalHistoryController.withdrawApplicationApprovalRefuse,
            data
        })
    }
    /**
     * 查看详情
     */
    withdrawApplicationDetail({ withdrawId }) {
        return this.netService.send({
            server: manageService.financeApprovalHistoryController.withdrawApplicationDetail,
            data: {
                withdrawId: withdrawId
            }
        })
    }

}