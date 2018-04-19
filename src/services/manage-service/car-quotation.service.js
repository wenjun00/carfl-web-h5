var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 经销商报价service
import { manageService } from '~/config/server/manage-service';
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
var CarQuotationService = /** @class */ (function () {
    function CarQuotationService() {
    }
    /**
     * 查询供应商报价
     */
    CarQuotationService.prototype.getCarQuotationByConditionPage = function (data, page) {
        return this.netService.send({
            server: manageService.carQuotationController.getCarQuotationByConditionPage,
            data: data,
            page: page
        });
    };
    /**
    * 创建供应商报价
    */
    CarQuotationService.prototype.createCarQuotation = function (data) {
        return this.netService.send({
            server: manageService.carQuotationController.createCarQuotation,
            data: data
        });
    };
    /**
    * 删除供应商报价
    */
    CarQuotationService.prototype.deleteCarQuotation = function (_a) {
        var id = _a.id;
        return this.netService.send({
            server: manageService.carQuotationController.deleteCarQuotation,
            data: {
                id: id
            }
        });
    };
    /**
    * 修改供应商报价
    */
    CarQuotationService.prototype.updateCarQuotation = function (data) {
        return this.netService.send({
            server: manageService.carQuotationController.updateCarQuotation,
            data: data
        });
    };
    __decorate([
        Inject(NetService)
    ], CarQuotationService.prototype, "netService", void 0);
    return CarQuotationService;
}());
export { CarQuotationService };
