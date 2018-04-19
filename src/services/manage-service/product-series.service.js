var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 产品计划管理期数service
import { manageService } from '~/config/server/manage-service';
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
var ProductSeriesService = /** @class */ (function () {
    function ProductSeriesService() {
    }
    /**
     * 新增/修改产品系列
     */
    ProductSeriesService.prototype.createOrModifyProductSeries = function (data) {
        return this.netService.send({
            server: manageService.productSeriesController.createOrModifyProductSeries,
            data: data
        });
    };
    /**
     *
     *  删除产品系列
     */
    ProductSeriesService.prototype.deleteProductSeries = function (_a) {
        var seriesId = _a.seriesId;
        return this.netService.send({
            server: manageService.productSeriesController.deleteProductSeries,
            seriesId: seriesId
        });
    };
    __decorate([
        Inject(NetService)
    ], ProductSeriesService.prototype, "netService", void 0);
    return ProductSeriesService;
}());
export { ProductSeriesService };
