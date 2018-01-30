import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'
export class RefundApplicationService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 进件  付款审批
   */
  getApprovalRecord(data, page) {
    return this.netService.send({
      server: manageService.refundApplicationController.getApprovalRecord,
      data: data,
      page: page
    })
  }
  /**
   * 进件  付款审批
   */
  getRefundApplicationById({refundId}) {
    return this.netService.send({
      server: manageService.refundApplicationController.getRefundApplicationById,
      data: {
        refundId: refundId
      }
    })
  }

  /**
   * 通过申请
   */
  passRefundApplication({refundId}) {
    return this.netService.send({
      server: manageService.refundApplicationController.passRefundApplication,
      data: {
        refundId: refundId
      }
    })
  }

  /**
   * 退回申请
   */
  returnRefundApplication({refundId}) {
    return this.netService.send({
      server: manageService.refundApplicationController.returnRefundApplication,
      data: {
        refundId: refundId
      }
    })
  }
}
