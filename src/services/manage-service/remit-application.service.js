var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service';
var RemitApplicationService = /** @class */ (function () {
    function RemitApplicationService() {
    }
    /**
     * 分页查询减免或冻结
     */
    RemitApplicationService.prototype.selectApplyForReliefHistory = function (data, page) {
        return this.netService.send({
            server: manageService.remitApplicationController.selectApplyForReliefHistory,
            data: data,
            page: page
        });
    };
    /**
     * 减免撤销
     */
    RemitApplicationService.prototype.remitCanceled = function (_a) {
        var applyId = _a.applyId;
        return this.netService.send({
            server: manageService.remitApplicationController.remitCanceled,
            data: {
                applyId: applyId
            }
        });
    };
    /**
     * 解冻
     */
    RemitApplicationService.prototype.freezeCancel = function (_a) {
        var applyId = _a.applyId;
        return this.netService.send({
            server: manageService.remitApplicationController.freezeCancel,
            data: {
                applyId: applyId
            }
        });
    };
    /**
     * 申请减免
     */
    RemitApplicationService.prototype.applyForRelief = function (data) {
        return this.netService.send({
            server: manageService.remitApplicationController.applyForRelief,
            data: data
        });
    };
    /**
     * 申请冻结
     */
    RemitApplicationService.prototype.applyToFreeze = function (data) {
        return this.netService.send({
            server: manageService.remitApplicationController.applyToFreeze,
            data: data
        });
    };
    __decorate([
        Inject(NetService)
    ], RemitApplicationService.prototype, "netService", void 0);
    return RemitApplicationService;
}());
export { RemitApplicationService };
