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
var PayoffProductOrderService = /** @class */ (function () {
    function PayoffProductOrderService() {
    }
    /**
     * 获取已未结清订单信息
     */
    PayoffProductOrderService.prototype.getPayoffProductOrders = function (data, page) {
        return this.netService.send({
            server: manageService.payoffProductOrderController.getPayoffProductOrders,
            data: data,
            page: page
        });
    };
    /**
     *
     * @param data 客户扣款记录
     */
    PayoffProductOrderService.prototype.getCustomerDeductionRecord = function (data) {
        return this.netService.send({
            server: manageService.payoffProductOrderController.getCustomerDeductionRecord,
            data: data
        });
    };
    /**
     * 获取已上传资料
     */
    PayoffProductOrderService.prototype.getHaveUploadedResources = function (data) {
        return this.netService.send({
            server: manageService.payoffProductOrderController.getHaveUploadedResources,
            data: data
        });
    };
    /**
     * 客户还款记录详情
     */
    PayoffProductOrderService.prototype.getPaymentRecordDetail = function (data) {
        return this.netService.send({
            server: manageService.payoffProductOrderController.getPaymentRecordDetail,
            data: data
        });
    };
    /**
     * 补传凭证资料
     */
    PayoffProductOrderService.prototype.supplementUploadResources = function (data) {
        return this.netService.send({
            server: manageService.payoffProductOrderController.supplementUploadResources,
            data: data
        });
    };
    __decorate([
        Inject(NetService)
    ], PayoffProductOrderService.prototype, "netService", void 0);
    return PayoffProductOrderService;
}());
export { PayoffProductOrderService };
