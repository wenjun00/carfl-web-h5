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
var PaymentScheduleService = /** @class */ (function () {
    function PaymentScheduleService() {
    }
    /**
     * 客户还款查询
     */
    PaymentScheduleService.prototype.getCustomerPayments = function (data, page) {
        return this.netService.send({
            server: manageService.paymentScheduleController.getCustomerPayments,
            data: data,
            page: page
        });
    };
    /**
     * 还款详情（彭长须接口）
     */
    PaymentScheduleService.prototype.getPaymentRecordDetail = function (_a) {
        var personalId = _a.personalId, businessId = _a.businessId, orderId = _a.orderId;
        return this.netService.send({
            server: manageService.paymentScheduleController.getPaymentRecordDetail,
            data: {
                personalId: personalId,
                businessId: businessId,
                orderId: orderId
            }
        });
    };
    /**
     * 还款总揽
     */
    PaymentScheduleService.prototype.getRepaymentOverview = function (_a) {
        var orderId = _a.orderId;
        return this.netService.send({
            server: manageService.paymentScheduleController.getRepaymentOverview,
            data: {
                orderId: orderId
            }
        });
    };
    /**
     * 还款详情(吴小川接口)
     */
    PaymentScheduleService.prototype.getPaymentDetail = function (_a) {
        var orderId = _a.orderId;
        return this.netService.send({
            server: manageService.paymentScheduleController.getPaymentDetail,
            data: {
                orderId: orderId
            }
        });
    };
    /**
     * 查看凭证
     */
    PaymentScheduleService.prototype.checkTheVoucher = function (_a) {
        var businessId = _a.businessId;
        return this.netService.send({
            server: manageService.paymentScheduleController.checkTheVoucher,
            data: {
                businessId: businessId
            }
        });
    };
    /**
     * 财务还款详情
     */
    PaymentScheduleService.prototype.getPaymentScheduleDetail = function (_a) {
        var orderId = _a.orderId;
        return this.netService.send({
            server: manageService.paymentScheduleController.getPaymentScheduleDetail,
            data: {
                orderId: orderId
            }
        });
    };
    /**
     * 财务确认还款信息
     */
    PaymentScheduleService.prototype.getCustomerScheduleBillDetail = function (_a) {
        var orderId = _a.orderId;
        return this.netService.send({
            server: manageService.paymentScheduleController.getCustomerScheduleBillDetail,
            data: {
                orderId: orderId
            }
        });
    };
    /**
     * 财务带搜索的划扣记录
     */
    PaymentScheduleService.prototype.getCustomerDeductionRecord = function (_a) {
        var orderId = _a.orderId, personalId = _a.personalId, startDate = _a.startDate, endDate = _a.endDate, periods = _a.periods, dealStatus = _a.dealStatus;
        return this.netService.send({
            server: manageService.paymentScheduleController.getCustomerDeductionRecord,
            data: {
                orderId: orderId,
                personalId: personalId,
                periods: periods,
                dealStatus: dealStatus,
                startDate: FilterService.dateFormat(startDate, 'yyyy-MM-dd'),
                endDate: FilterService.dateFormat(endDate, 'yyyy-MM-dd')
            }
        });
    };
    /**
     * 保存客户还款信息
     */
    PaymentScheduleService.prototype.saveCustomerPaymentInfo = function (data) {
        return this.netService.send({
            server: manageService.paymentScheduleController.saveCustomerPaymentInfo,
            data: data
        });
    };
    /**
     * 保存客户还款草稿信息
     */
    PaymentScheduleService.prototype.saveCustomerPaymentInfoAsDraft = function (data) {
        return this.netService.send({
            server: manageService.paymentScheduleController.saveCustomerPaymentInfoAsDraft,
            data: data
        });
    };
    __decorate([
        Inject(NetService)
    ], PaymentScheduleService.prototype, "netService", void 0);
    return PaymentScheduleService;
}());
export { PaymentScheduleService };
