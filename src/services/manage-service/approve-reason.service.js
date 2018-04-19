var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { manageService } from '~/config/server/manage-service';
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
var ApproveReasonService = /** @class */ (function () {
    function ApproveReasonService() {
    }
    /**
     * 分页查询审批原因
     */
    ApproveReasonService.prototype.getAllApproveReason = function (data, page) {
        return this.netService.send({
            server: manageService.approveReeasonController.getAllApproveReason,
            data: data,
            page: page
        });
    };
    /**
     * 审批原因模板下载
     */
    ApproveReasonService.prototype.downloadApproveReasonTemplate = function () {
        return this.netService.send({
            server: manageService.approveReeasonController.downloadApproveReasonTemplate,
        });
    };
    /**
     * 新增审批原因
     */
    ApproveReasonService.prototype.createApproveReason = function (data) {
        return this.netService.send({
            server: manageService.approveReeasonController.createApproveReason,
            data: data
        });
    };
    /**
     * 导入审批原因
     */
    ApproveReasonService.prototype.ImportApproveReason = function (data) {
        return this.netService.send({
            server: manageService.approveReeasonController.ImportApproveReason,
            data: data
        });
    };
    /**
     * 根据条件查询审批原因
     */
    ApproveReasonService.prototype.getApproveReasonByCondition = function (data) {
        return this.netService.send({
            server: manageService.approveReeasonController.getApproveReasonByCondition,
            data: data
        });
    };
    /**
   * 删除审批原因
   */
    ApproveReasonService.prototype.deleteApproveReason = function (_a) {
        var id = _a.id;
        return this.netService.send({
            server: manageService.approveReeasonController.deleteApproveReason,
            data: {
                id: id
            }
        });
    };
    __decorate([
        Inject(NetService)
    ], ApproveReasonService.prototype, "netService", void 0);
    return ApproveReasonService;
}());
export { ApproveReasonService };
