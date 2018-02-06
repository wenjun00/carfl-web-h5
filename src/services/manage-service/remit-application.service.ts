import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'
export class RemitApplicationService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 分页查询减免或冻结
   */
  selectApplyForReliefHistory(data, page) {
    return this.netService.send({
      server: manageService.remitApplicationController.selectApplyForReliefHistory,
      data: data,
      page: page
    })
  }
  /**
   * 减免撤销
   */
  remitCanceled({ applyId }) {
    return this.netService.send({
      server: manageService.remitApplicationController.remitCanceled,
      data: {
        applyId: applyId
      }
    })
  }
  /**
   * 解冻
   */
  freezeCancel({ applyId }) {
    return this.netService.send({
      server: manageService.remitApplicationController.freezeCancel,
      data: {
        applyId: applyId
      }
    })
  }
  /**
   * 申请减免
   */
  applyForRelief(data) {
    return this.netService.send({
      server: manageService.remitApplicationController.applyForRelief,
      data: data
    })
  }
  /**
   * 申请冻结
   */
  applyToFreeze(data) {
    return this.netService.send({
      server: manageService.remitApplicationController.applyToFreeze,
      data: data
    })
  }
}