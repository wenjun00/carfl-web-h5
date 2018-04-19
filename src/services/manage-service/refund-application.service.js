var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service';
import { FilterService } from "~/utils/filter.service";
var RefundApplicationService = /** @class */ (function () {
    function RefundApplicationService() {
    }
    /**
     * 确认付款
     */
    RefundApplicationService.prototype.comfireRefund = function (data) {
        return this.netService.send({
            server: manageService.refundApplicationController.comfireRefund,
            data: data
        });
    };
    /**
     * 进件  付款审批
     */
    RefundApplicationService.prototype.getApprovalRecord = function (data, page) {
        return this.netService.send({
            server: manageService.refundApplicationController.getApprovalRecord,
            data: {
                getApprovalRecord: data.getApprovalRecord,
                refundName: data.refundName,
                timeSearch: data.timeSearch,
                processStatus: data.processStatus,
                startDate: FilterService.dateFormat(data.startDate, 'yyyy-MM-dd'),
                endDate: FilterService.dateFormat(data.endDate, 'yyyy-MM-dd')
            },
            page: page
        });
    };
    /**
     * 进件  付款审批
     */
    RefundApplicationService.prototype.getRefundApplicationById = function (_a) {
        var refundId = _a.refundId;
        return this.netService.send({
            server: manageService.refundApplicationController.getRefundApplicationById,
            data: {
                refundId: refundId
            }
        });
    };
    /**
     * 通过申请
     */
    RefundApplicationService.prototype.passRefundApplication = function (_a) {
        var refundId = _a.refundId;
        return this.netService.send({
            server: manageService.refundApplicationController.passRefundApplication,
            data: {
                refundId: refundId
            }
        });
    };
    /**
     * 退回申请
     */
    RefundApplicationService.prototype.returnRefundApplication = function (_a) {
        var refundId = _a.refundId;
        return this.netService.send({
            server: manageService.refundApplicationController.returnRefundApplication,
            data: {
                refundId: refundId
            }
        });
    };
    /**
     * 证件号、订单号、客户姓名查询订单/账户/付款信息
     */
    RefundApplicationService.prototype.getAllMessageByParams = function (data) {
        return this.netService.send({
            server: manageService.refundApplicationController.getAllMessageByParams,
            data: data
        });
    };
    /**
     * 保存/保存并提交付款申请
     */
    RefundApplicationService.prototype.saveSubmitApplication = function (data) {
        return this.netService.send({
            server: manageService.refundApplicationController.saveSubmitApplication,
            data: data
        });
    };
    /**
     * 获取付款明细项
     */
    RefundApplicationService.prototype.getRefundItems = function (_a) {
        var orderId = _a.orderId;
        return this.netService.send({
            server: manageService.refundApplicationController.getRefundItems,
            data: {
                orderId: orderId
            }
        });
    };
    /**
     * 进件，财务----付款记录查询/付款查询
     */
    RefundApplicationService.prototype.getRefundRecord = function (data, page) {
        return this.netService.send({
            server: manageService.refundApplicationController.getRefundRecord,
            data: data,
            page: page
        });
    };
    __decorate([
        Inject(NetService)
    ], RefundApplicationService.prototype, "netService", void 0);
    return RefundApplicationService;
}());
export { RefundApplicationService };
