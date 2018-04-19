var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service';
var FinanceApprovalHistoryService = /** @class */ (function () {
    function FinanceApprovalHistoryService() {
    }
    /**
     * 收款审批记录查询
     */
    FinanceApprovalHistoryService.prototype.getWithdrawApprovalList = function (data, page) {
        return this.netService.send({
            server: manageService.financeApprovalHistoryController.getWithdrawApprovalList,
            data: data,
            page: page
        });
    };
    /**
     * 审批通过
     */
    FinanceApprovalHistoryService.prototype.withdrawApplicationApprovalPass = function (data) {
        return this.netService.send({
            server: manageService.financeApprovalHistoryController.withdrawApplicationApprovalPass,
            data: data
        });
    };
    /**
     * 审批拒绝
     */
    FinanceApprovalHistoryService.prototype.withdrawApplicationApprovalRefuse = function (data) {
        return this.netService.send({
            server: manageService.financeApprovalHistoryController.withdrawApplicationApprovalRefuse,
            data: data
        });
    };
    /**
     * 查看详情
     */
    FinanceApprovalHistoryService.prototype.withdrawApplicationDetail = function (_a) {
        var withdrawId = _a.withdrawId;
        return this.netService.send({
            server: manageService.financeApprovalHistoryController.withdrawApplicationDetail,
            data: {
                withdrawId: withdrawId
            }
        });
    };
    __decorate([
        Inject(NetService)
    ], FinanceApprovalHistoryService.prototype, "netService", void 0);
    return FinanceApprovalHistoryService;
}());
export { FinanceApprovalHistoryService };
