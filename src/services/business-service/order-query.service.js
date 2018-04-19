var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { businessService } from '~/config/server';
import { Inject, Debounce } from "~/core/decorator";
var OrderQueryService = /** @class */ (function () {
    function OrderQueryService() {
    }
    /**
     * 获取订单交接
     */
    OrderQueryService.prototype.getOrderQueryData = function () {
        return this.netService.send({
            server: businessService.orderQueryController.getOrderQueryData,
            data: {}
        });
    };
    /**
     * 订单进度
     */
    OrderQueryService.prototype.getOrderProgress = function () {
        return this.netService.send({
            server: businessService.orderQueryController.getOrderProgress,
            data: {}
        });
    };
    /**
     * 产品包查询
     */
    OrderQueryService.prototype.getProductQuery = function () {
        return this.netService.send({
            server: businessService.orderQueryController.getProductQuery,
            data: {}
        });
    };
    __decorate([
        Inject()
    ], OrderQueryService.prototype, "netService", void 0);
    __decorate([
        Debounce()
    ], OrderQueryService.prototype, "getOrderQueryData", null);
    return OrderQueryService;
}());
export { OrderQueryService };
