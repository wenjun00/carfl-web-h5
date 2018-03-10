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
    return this.netService.send({
      server: reportService.reportController.getSettlementReport,
      data: {
        companyId: data.companyId,
        channel: data.channel,
        minSettlementDate: FilterService.dateFormat(data.minSettlementDate, 'yyyy-MM-dd'),
        maxSettlementDate: FilterService.dateFormat(data.maxSettlementDate, 'yyyy-MM-dd')
      }
    })
  }
}