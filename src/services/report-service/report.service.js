var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { reportService } from '~/config/server';
import { Inject } from "~/core/decorator";
import { FilterService } from "~/utils/filter.service";
var ReportService = /** @class */ (function () {
    function ReportService() {
    }
    /**
     * 查询清结算日报表
     */
    ReportService.prototype.getSettlementReport = function (data) {
        return this.netService.send({
            server: reportService.reportController.getSettlementReport,
            data: {
                companyId: data.companyId,
                channel: data.channel,
                minSettlementDate: FilterService.dateFormat(data.minSettlementDate, 'yyyy-MM-dd'),
                maxSettlementDate: FilterService.dateFormat(data.maxSettlementDate, 'yyyy-MM-dd')
            }
        });
    };
    __decorate([
        Inject()
    ], ReportService.prototype, "netService", void 0);
    return ReportService;
}());
export { ReportService };
