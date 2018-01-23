// 审批管理service
import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class ApprovalService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 分页查询审批原因
   */
  auditResourcePool(data, page) {
    return this.netService.send({
      server: manageService.approvalController.auditResourcePool,
      data: data,
      page: page
    })
  }
}
