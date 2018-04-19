var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { manageService } from '~/config/server/manage-service';
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
var WithdrawApplicationService = /** @class */ (function () {
    function WithdrawApplicationService() {
    }
    /**
     * 获取销售收款申请信息
     */
    WithdrawApplicationService.prototype.getSaleCollectMoneyApplicationInfo = function (_a) {
        var personalId = _a.personalId, orderId = _a.orderId;
        return this.netService.send({
            server: manageService.withdrawApplicationController.getSaleCollectMoneyApplicationInfo,
            data: {
                personalId: personalId,
                orderId: orderId
            }
        });
    };
    /**
     * 获取提前结清信息
     */
    WithdrawApplicationService.prototype.getAdvancePayoffApplicationInfo = function (_a) {
        var personalId = _a.personalId, orderId = _a.orderId;
        return this.netService.send({
            server: manageService.withdrawApplicationController.getAdvancePayoffApplicationInfo,
            data: {
                personalId: personalId,
                orderId: orderId
            }
        });
    };
    /**
   * 获取提前收回信息
   */
    WithdrawApplicationService.prototype.getAdvanceRevokeApplicationInfo = function (_a) {
        var personalId = _a.personalId, orderId = _a.orderId;
        return this.netService.send({
            server: manageService.withdrawApplicationController.getAdvanceRevokeApplicationInfo,
            data: {
                personalId: personalId,
                orderId: orderId
            }
        });
    };
    /**
     * 获取客户订单信息（旧接口）
     */
    WithdrawApplicationService.prototype.getPersonalProductOrderInfo = function (_a) {
        var idCard = _a.idCard, customerName = _a.customerName, mobileMain = _a.mobileMain;
        return this.netService.send({
            server: manageService.withdrawApplicationController.getPersonalProductOrderInfo,
            data: {
                idCard: idCard,
                customerName: customerName,
                mobileMain: mobileMain
            }
        });
    };
    /**
   * 获取提前收回信息
   */
    // getPersonalProductOrderInfo(data) {
    //   return this.netService.send({
    //     server: manageService.withdrawApplicationController.getPersonalProductOrderInfo,
    //     data: data,
    //   })
    // }
    /**
    * 获取销售收款项
    */
    WithdrawApplicationService.prototype.getSaleCollectMoneyItems = function (_a) {
        var orderId = _a.orderId;
        return this.netService.send({
            server: manageService.withdrawApplicationController.getSaleCollectMoneyItems,
            data: {
                orderId: orderId
            }
        });
    };
    /**
     * 销售收款申请保存草稿
     */
    WithdrawApplicationService.prototype.saveSaleCollectMoneyApplicationAsDraft = function (data) {
        return this.netService.send({
            server: manageService.withdrawApplicationController.saveSaleCollectMoneyApplicationAsDraft,
            data: data
        });
    };
    /**
     * 销售收款申请 保存并提交
     */
    WithdrawApplicationService.prototype.saveSaleCollectMoneyApplication = function (data) {
        return this.netService.send({
            server: manageService.withdrawApplicationController.saveSaleCollectMoneyApplication,
            data: data
        });
    };
    /**
     * 获取提前结清收款项
     */
    WithdrawApplicationService.prototype.getAdvancePayoffItems = function (_a) {
        var orderId = _a.orderId;
        return this.netService.send({
            server: manageService.withdrawApplicationController.getAdvancePayoffItems,
            data: {
                orderId: orderId
            }
        });
    };
    /**
     * 保存提前结清草稿
     */
    WithdrawApplicationService.prototype.saveAdvancePayoffApplicationAsDraft = function (data) {
        return this.netService.send({
            server: manageService.withdrawApplicationController.saveAdvancePayoffApplicationAsDraft,
            data: data
        });
    };
    /**
     * 保存并提交提前结清
     */
    WithdrawApplicationService.prototype.saveAdvancePayoffApplication = function (data) {
        return this.netService.send({
            server: manageService.withdrawApplicationController.saveAdvancePayoffApplication,
            data: data
        });
    };
    /**
     * 保存提前收回申请作为草稿
     */
    WithdrawApplicationService.prototype.saveAdvanceRevokeApplicationAsDraft = function (data) {
        return this.netService.send({
            server: manageService.withdrawApplicationController.saveAdvanceRevokeApplicationAsDraft,
            data: data
        });
    };
    WithdrawApplicationService.prototype.saveAdvanceRevokeApplication = function (data) {
        return this.netService.send({
            server: manageService.withdrawApplicationController.saveAdvanceRevokeApplication,
            data: data
        });
    };
    /**
     * 获取收款申请记录
     */
    WithdrawApplicationService.prototype.getGatheringApprovalList = function (data, page) {
        return this.netService.send({
            server: manageService.withdrawApplicationController.getGatheringApprovalList,
            data: data,
            page: page
        });
    };
    /**
     * 查看申请详情
     */
    WithdrawApplicationService.prototype.viewApplicationDetail = function (_a) {
        var applicationId = _a.applicationId;
        return this.netService.send({
            server: manageService.withdrawApplicationController.viewApplicationDetail,
            data: {
                applicationId: applicationId
            }
        });
    };
    /**
     * 获取客户订单信息（新接口）
     */
    WithdrawApplicationService.prototype.getPersonalProductOrderInfoForAdvance = function (_a) {
        var idCard = _a.idCard, customerName = _a.customerName, mobileMain = _a.mobileMain;
        return this.netService.send({
            server: manageService.withdrawApplicationController.getPersonalProductOrderInfoForAdvance,
            data: {
                idCard: idCard,
                customerName: customerName,
                mobileMain: mobileMain
            }
        });
    };
    /**
     * 获取提前收回收款项
     */
    WithdrawApplicationService.prototype.getAdvanceRevokeItems = function (_a) {
        var orderId = _a.orderId;
        return this.netService.send({
            server: manageService.withdrawApplicationController.getAdvanceRevokeItems,
            data: {
                orderId: orderId
            }
        });
    };
    __decorate([
        Inject(NetService)
    ], WithdrawApplicationService.prototype, "netService", void 0);
    return WithdrawApplicationService;
}());
export { WithdrawApplicationService };
