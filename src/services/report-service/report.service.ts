import { reportService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from "~/utils/filter.service"

export class ReportService {
  @Inject()
  private netService: NetService

  /**
   * 查询清结算日报表
   */
  getSettlementReport(data) {
    const dateRange = FilterService.dateRanageFormat(data.dateRange)
    return this.netService.send({
      server: reportService.reportController.getSettlementReport,
      data: {
        companyId: data.companyId,
        channel: data.channel,
        minSettlementDate: dateRange.start,
        maxSettlementDate: dateRange.end,
      }
    })
  }
}
