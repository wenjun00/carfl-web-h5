var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 审批管理service
import { manageService } from '~/config/server/manage-service';
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
var AdvancePayoffService = /** @class */ (function () {
    function AdvancePayoffService() {
    }
    /**
     * 获取客户提前结清列表
     */
    AdvancePayoffService.prototype.getAdvancePayoffList = function (data, page) {
        return this.netService.send({
            server: manageService.advancePayoffController.getAdvancePayoffList,
            data: data,
            page: page
        });
    };
    /**
     *
     * @param data 获取客户提前结清账单信息
     */
    AdvancePayoffService.prototype.getAdvancePayoffBillInfo = function (data) {
        return this.netService.send({
            server: manageService.advancePayoffController.getAdvancePayoffBillInfo,
            data: data
        });
    };
    /**
     * 客户划扣记录
     */
    AdvancePayoffService.prototype.getCustomerDeductionRecord = function (data) {
        return this.netService.send({
            server: manageService.advancePayoffController.getCustomerDeductionRecord,
            data: data
        });
    };
    /**
     * 获取已上传资料
     */
    AdvancePayoffService.prototype.getHaveUploadedResources = function (data) {
        return this.netService.send({
            server: manageService.advancePayoffController.getHaveUploadedResources,
            data: data
        });
    };
    /**
     * 客户还款记录详情
     */
    AdvancePayoffService.prototype.getPaymentRecordDetail = function (data) {
        return this.netService.send({
            server: manageService.advancePayoffController.getPaymentRecordDetail,
            data: data
        });
    };
    /**
     * 客户分期还款记录
     */
    AdvancePayoffService.prototype.getPaymentScheduleDetail = function (data, page) {
        return this.netService.send({
            server: manageService.advancePayoffController.getPaymentScheduleDetail,
            data: data,
            page: page
        });
    };
    /**
     * 确定
     */
    AdvancePayoffService.prototype.saveCollectMoneyHistory = function (data) {
        return this.netService.send({
            server: manageService.advancePayoffController.saveCollectMoneyHistory,
            data: data
        });
    };
    /**
     * 保存草稿
     */
    AdvancePayoffService.prototype.saveCollectMoneyHistoryAsDraft = function (data) {
        return this.netService.send({
            server: manageService.advancePayoffController.saveCollectMoneyHistoryAsDraft,
            data: data
        });
    };
    /**
     * 补传凭证资料
     */
    AdvancePayoffService.prototype.supplementUploadResources = function (data) {
        return this.netService.send({
            server: manageService.advancePayoffController.supplementUploadResources,
            data: data
        });
    };
    __decorate([
        Inject(NetService)
    ], AdvancePayoffService.prototype, "netService", void 0);
    return AdvancePayoffService;
}());
export { AdvancePayoffService };
