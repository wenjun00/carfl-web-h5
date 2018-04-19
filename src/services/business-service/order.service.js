var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { businessService } from '~/config/server';
import { Inject, Debounce } from "~/core/decorator";
var OrderService = /** @class */ (function () {
    function OrderService() {
    }
    /**
     * 获取订单交接
     */
    OrderService.prototype.getOrderConnect = function () {
        return this.netService.send({
            server: businessService.orderController.getOrderConnect,
            data: {}
        });
    };
    /**
     * 获取客户签约信息
     */
    OrderService.prototype.getClientSign = function () {
        return this.netService.send({
            server: businessService.orderController.getClientSign,
            data: {}
        });
    };
    /**
     * 获取客户开户
     */
    OrderService.prototype.getClientAccount = function () {
        return this.netService.send({
            server: businessService.orderController.getClientAccount,
            data: {}
        });
    };
    /**
     * 获取银验卡失败原因信息
     */
    OrderService.prototype.getCheckCardReasonInfo = function () {
        return this.netService.send({
            server: businessService.orderController.getCheckCardReasonInfo,
            data: {}
        });
    };
    /**
     * 一键交接表格数据
     */
    OrderService.prototype.getTreeDatabox = function () {
        return this.netService.send({
            server: businessService.orderController.getTreeDatabox,
            data: {}
        });
    };
    /**
     * 客户资料查询
     */
    OrderService.prototype.getClientInfo = function () {
        return this.netService.send({
            server: businessService.orderController.getClientInfo,
            data: {}
        });
    };
    /**
     * 融资租赁申请页客户联系人信息
     */
    OrderService.prototype.getContactsInfo = function () {
        return this.netService.send({
            server: businessService.orderController.getContactsInfo,
            data: {}
        });
    };
    /**
     * 融资租赁申请页客户联系人信息其他联系人
     */
    OrderService.prototype.getContactsRelationInfo = function () {
        return this.netService.send({
            server: businessService.orderController.getContactsRelationInfo,
            data: {}
        });
    };
    __decorate([
        Inject()
    ], OrderService.prototype, "netService", void 0);
    __decorate([
        Debounce()
    ], OrderService.prototype, "getOrderConnect", null);
    return OrderService;
}());
export { OrderService };
