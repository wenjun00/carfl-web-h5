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
var AdvanceRevokeService = /** @class */ (function () {
    function AdvanceRevokeService() {
    }
    /**
     * 获取客户提前收回列表
     */
    AdvanceRevokeService.prototype.getAdvanceRevokeList = function (data, page) {
        return this.netService.send({
            server: manageService.advanceRevokeController.getAdvanceRevokeList,
            data: data,
            page: page
        });
    };
    /**
     *
     * @param data 获取客户提前收回账单信息
     */
    AdvanceRevokeService.prototype.getAdvanceRevokeBillInfo = function (data) {
        return this.netService.send({
            server: manageService.advanceRevokeController.getAdvanceRevokeBillInfo,
            data: data
        });
    };
    /**
     * 客户划扣记录
     */
    AdvanceRevokeService.prototype.getCustomerDeductionRecord = function (data) {
        return this.netService.send({
            server: manageService.advanceRevokeController.getCustomerDeductionRecord,
            data: data
        });
    };
    /**
     * 获取已上传资料
     */
    AdvanceRevokeService.prototype.getHaveUploadedResources = function (data) {
        return this.netService.send({
            server: manageService.advanceRevokeController.getHaveUploadedResources,
            data: data
        });
    };
    /**
     * 客户还款记录详情
     */
    AdvanceRevokeService.prototype.getPaymentRecordDetail = function (data) {
        return this.netService.send({
            server: manageService.advanceRevokeController.getPaymentRecordDetail,
            data: data
        });
    };
    /**
     * 客户分期还款记录
     */
    AdvanceRevokeService.prototype.getPaymentScheduleDetail = function (data, page) {
        return this.netService.send({
            server: manageService.advanceRevokeController.getPaymentScheduleDetail,
            data: data,
            page: page
        });
    };
    /**
     * 确定
     */
    AdvanceRevokeService.prototype.saveCollectMoneyHistory = function (data) {
        return this.netService.send({
            server: manageService.advanceRevokeController.saveCollectMoneyHistory,
            data: data
        });
    };
    /**
     * 保存草稿
     */
    AdvanceRevokeService.prototype.saveCollectMoneyHistoryAsDraft = function (data) {
        return this.netService.send({
            server: manageService.advanceRevokeController.saveCollectMoneyHistoryAsDraft,
            data: data
        });
    };
    /**
     * 补传凭证资料
     */
    AdvanceRevokeService.prototype.supplementUploadResources = function (data) {
        return this.netService.send({
            server: manageService.advanceRevokeController.supplementUploadResources,
            data: data
        });
    };
    __decorate([
        Inject(NetService)
    ], AdvanceRevokeService.prototype, "netService", void 0);
    return AdvanceRevokeService;
}());
export { AdvanceRevokeService };
