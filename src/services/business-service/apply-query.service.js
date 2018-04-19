var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { businessService } from '~/config/server';
import { Inject, Debounce } from "~/core/decorator";
var ApplyQueryService = /** @class */ (function () {
    function ApplyQueryService() {
    }
    /**
     * 获取订单交接
     */
    ApplyQueryService.prototype.getFullQueryData = function () {
        return this.netService.send({
            server: businessService.applyQueryController.getFullQueryData,
            data: {}
        });
    };
    ApplyQueryService.prototype.addCarQueryData = function () {
        return this.netService.send({
            server: businessService.applyQueryController.addCarQueryData,
            data: {}
        });
    };
    __decorate([
        Inject()
    ], ApplyQueryService.prototype, "netService", void 0);
    __decorate([
        Debounce()
    ], ApplyQueryService.prototype, "getFullQueryData", null);
    __decorate([
        Debounce()
    ], ApplyQueryService.prototype, "addCarQueryData", null);
    return ApplyQueryService;
}());
export { ApplyQueryService };
