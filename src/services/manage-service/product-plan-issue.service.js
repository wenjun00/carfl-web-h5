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
var ProductPlanIssueService = /** @class */ (function () {
    function ProductPlanIssueService() {
    }
    /**
     * 新增/修改产品计划期数管理
     */
    ProductPlanIssueService.prototype.createOrModifyProductPlan = function (data) {
        return this.netService.send({
            server: manageService.productPlanIssueController.createOrModifyProductPlan,
            data: data
        });
    };
    /**
     *
     *  分页查询某一产品下的所有计划
     */
    ProductPlanIssueService.prototype.getAllProductPlan = function (data, page) {
        return this.netService.send({
            server: manageService.productPlanIssueController.getAllProductPlan,
            data: data,
            page: page
        });
    };
    /**
     * 发布
     */
    ProductPlanIssueService.prototype.publish = function (data) {
        return this.netService.send({
            server: manageService.productPlanIssueController.publish,
            data: data
        });
    };
    /**
     * 停用启用
     */
    ProductPlanIssueService.prototype.ableOrUnable = function (data) {
        return this.netService.send({
            server: manageService.productPlanIssueController.ableOrUnable,
            data: data
        });
    };
    __decorate([
        Inject(NetService)
    ], ProductPlanIssueService.prototype, "netService", void 0);
    return ProductPlanIssueService;
}());
export { ProductPlanIssueService };
