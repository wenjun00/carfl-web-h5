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
var ApprovalService = /** @class */ (function () {
    function ApprovalService() {
    }
    /**
     * 分页查询审批原因
     */
    ApprovalService.prototype.auditResourcePool = function (data, page) {
        return this.netService.send({
            server: manageService.approvalController.auditResourcePool,
            data: data,
            page: page
        });
    };
    /**
     *
     * @param data 领取订单到我的审核
     */
    ApprovalService.prototype.batchReceiveApproval = function (data) {
        return this.netService.send({
            server: manageService.approvalController.batchReceiveApproval,
            data: data
        });
    };
    /**
     * 我的审核
     */
    ApprovalService.prototype.getMyApprovalOrder = function (data, page) {
        return this.netService.send({
            server: manageService.approvalController.getMyApprovalOrder,
            data: data,
            page: page
        });
    };
    /**
     * 订单查询、内审、黑名单、灰名单
     */
    ApprovalService.prototype.approvalOrderSearch = function (data, page) {
        return this.netService.send({
            server: manageService.approvalController.approvalOrderSearch,
            data: data,
            page: page
        });
    };
    /**
     * 内审、黑名单、灰名单移出
     */
    ApprovalService.prototype.removeRiskStatus = function (_a) {
        var orderIds = _a.orderIds, isBlack = _a.isBlack;
        return this.netService.send({
            server: manageService.approvalController.removeRiskStatus,
            data: {
                orderIds: orderIds,
                isBlack: isBlack
            }
        });
    };
    /**
     * 审核记录表查询
     */
    ApprovalService.prototype.getAuditRecord = function (data, page) {
        return this.netService.send({
            server: manageService.approvalController.getAuditRecord,
            data: data,
            page: page
        });
    };
    /**
     * 订单查询、进度查询
     */
    ApprovalService.prototype.findOrderApproveRecord = function (_a) {
        var orderId = _a.orderId;
        return this.netService.send({
            server: manageService.approvalController.findOrderApproveRecord,
            data: {
                orderId: orderId
            }
        });
    };
    /**
     * 退回资源池
     */
    ApprovalService.prototype.goBackResourcePool = function (_a) {
        var orderId = _a.orderId;
        return this.netService.send({
            server: manageService.approvalController.goBackResourcePool,
            data: {
                orderId: orderId
            }
        });
    };
    /**
     * 提交内审&灰名单
     */
    ApprovalService.prototype.submitInternalAuditOrGreyList = function (data) {
        return this.netService.send({
            server: manageService.approvalController.submitInternalAuditOrGreyList,
            data: data
        });
    };
    /**
     * 提交黑名单&拒绝
     */
    ApprovalService.prototype.submitBlackListOrRefuse = function (data) {
        return this.netService.send({
            server: manageService.approvalController.submitBlackListOrRefuse,
            data: data
        });
    };
    /**
     * 退件
     */
    ApprovalService.prototype.goBackInComing = function (data) {
        return this.netService.send({
            server: manageService.approvalController.goBackInComing,
            data: data
        });
    };
    /**
     * 审批通过
     */
    ApprovalService.prototype.passApproval = function (data) {
        return this.netService.send({
            server: manageService.approvalController.passApproval,
            data: data
        });
    };
    /**
     * 订单流程查询
     */
    ApprovalService.prototype.getOrderProcess = function (_a) {
        var orderId = _a.orderId;
        return this.netService.send({
            server: manageService.approvalController.getOrderProcess,
            data: {
                orderId: orderId
            }
        });
    };
    /**
     * 获取订单相关比例
     */
    ApprovalService.prototype.getRate = function (_a) {
        var orderId = _a.orderId;
        return this.netService.send({
            server: manageService.approvalController.getRate,
            data: {
                orderId: orderId
            }
        });
    };
    __decorate([
        Inject(NetService)
    ], ApprovalService.prototype, "netService", void 0);
    return ApprovalService;
}());
export { ApprovalService };
