var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { manageService } from '~/config/server/manage-service';
import { Inject, Debounce } from "~/core/decorator";
var ProductPackageService = /** @class */ (function () {
    function ProductPackageService() {
    }
    /**
     * 多条件分页查询产品包信息
     */
    ProductPackageService.prototype.getAllProductPackage = function (data, page) {
        return this.netService.send({
            server: manageService.productPackageController.getAllProductPackage,
            data: data,
            page: page
        });
    };
    /**
     * 删除产品包信息
     */
    ProductPackageService.prototype.deleteProductPackage = function (_a) {
        var id = _a.id;
        return this.netService.send({
            server: manageService.productPackageController.deleteProductPackage,
            data: {
                id: id
            }
        });
    };
    /**
     * 下载产品包信息
     */
    ProductPackageService.prototype.downloadProductPackage = function (_a) {
        var fileId = _a.fileId;
        return this.netService.send({
            server: manageService.productPackageController.downloadProductPackage,
            data: {
                fileId: fileId
            }
        });
    };
    /**
     * 新增产品包信息
     */
    ProductPackageService.prototype.createProductPackage = function (data) {
        return this.netService.send({
            server: manageService.productPackageController.createProductPackage,
            data: data
        });
    };
    /**
     * 下载模板
     */
    ProductPackageService.prototype.downloadTemplate = function () {
        return this.netService.send({
            server: manageService.productPackageController.downloadTemplate
        });
    };
    /**
   * 查询所有产品包
   */
    ProductPackageService.prototype.getAllProductPackageNoPage = function () {
        return this.netService.send({
            server: manageService.productPackageController.getAllProductPackageNoPage
        });
    };
    __decorate([
        Inject()
    ], ProductPackageService.prototype, "netService", void 0);
    __decorate([
        Debounce()
    ], ProductPackageService.prototype, "getAllProductPackage", null);
    __decorate([
        Debounce()
    ], ProductPackageService.prototype, "deleteProductPackage", null);
    __decorate([
        Debounce()
    ], ProductPackageService.prototype, "downloadProductPackage", null);
    return ProductPackageService;
}());
export { ProductPackageService };
