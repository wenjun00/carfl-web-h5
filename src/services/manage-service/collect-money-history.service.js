var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 收款service
import { manageService } from '~/config/server/manage-service';
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
import { FilterService } from "~/utils/filter.service";
var CollectMoneyHistoryService = /** @class */ (function () {
    function CollectMoneyHistoryService() {
    }
    /**
     * 获取收款列表
     */
    CollectMoneyHistoryService.prototype.collectMoneyHistoryList = function (data, page) {
        return this.netService.send({
            server: manageService.collectMoneyHistoryController.collectMoneyHistoryList,
            data: {
                accountName: data.accountName,
                timeSearch: data.timeSearch,
                queryStartDate: FilterService.dateFormat(data.queryStartDate, 'yyyy-MM-dd'),
                queryEndDate: FilterService.dateFormat(data.queryEndDate, 'yyyy-MM-dd')
            },
            page: page
        });
    };
    /**
     * 申请详情
     */
    CollectMoneyHistoryService.prototype.withdrawApplicationDetail = function (data) {
        return this.netService.send({
            server: manageService.collectMoneyHistoryController.withdrawApplicationDetail,
            data: data
        });
    };
    /**
     * 保存收款历史
     */
    CollectMoneyHistoryService.prototype.saveCollectMoneyHistory = function (data) {
        return this.netService.send({
            server: manageService.collectMoneyHistoryController.saveCollectMoneyHistory,
            data: data
        });
    };
    /**
     * 保存收款历史草稿
     */
    CollectMoneyHistoryService.prototype.saveCollectMoneyHistoryAsDraft = function (data) {
        return this.netService.send({
            server: manageService.collectMoneyHistoryController.saveCollectMoneyHistoryAsDraft,
            data: data
        });
    };
    /**
     * 保存收款历史草稿
     */
    CollectMoneyHistoryService.prototype.sendBackWithdrawApplication = function (data) {
        return this.netService.send({
            server: manageService.collectMoneyHistoryController.sendBackWithdrawApplication,
            data: data
        });
    };
    __decorate([
        Inject(NetService)
    ], CollectMoneyHistoryService.prototype, "netService", void 0);
    return CollectMoneyHistoryService;
}());
export { CollectMoneyHistoryService };
