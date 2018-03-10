import { reportService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
export class ReportService {
  @Inject()
  private netService: NetService

  /**
   * 查询清结算日报表
   */
  getSettlementReport(data) {
    return this.netService.send({
      server: reportService.reportController.getSettlementReport,
      data
    })
  }
}