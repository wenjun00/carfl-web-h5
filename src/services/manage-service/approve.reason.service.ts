import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class ApproveReasonService {
    @Inject(NetService)
    private netService: NetService

    /**
     * 分页查询审批原因
     */
    getAllApproveReason(data, page) {
        return this.netService.send({
            server: manageService.approveReeasonController.getAllApproveReason,
            data: data,
            page: page
        })
    }
    /**
     * 审批原因模板下载
     */
    downloadApproveReasonTemplate() {
        return this.netService.send({
            server: manageService.approveReeasonController.downloadApproveReasonTemplate,
        })
    }
    /**
     * 新增审批原因
     */
    createApproveReason(data) {
        return this.netService.send({
            server: manageService.approveReeasonController.createApproveReason,
            data: data
        })
    }
    /**
     * 导入审批原因
     */
    ImportApproveReason(data) {
        return this.netService.send({
            server: manageService.approveReeasonController.ImportApproveReason,
            data: data
        })
    }
}
