var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 产品service
import { manageService } from '~/config/server/manage-service';
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
var ProductService = /** @class */ (function () {
    function ProductService() {
    }
    /**
     * 配置产品流程--添加
     */
    ProductService.prototype.configureProductProcessAdd = function (data) {
        return this.netService.send({
            server: manageService.productController.configureProductProcessAdd,
            data: data
        });
    };
    /**
     *
     * @param data 配置产品流程--删除
     */
    ProductService.prototype.configureProductProcessDelete = function (data) {
        return this.netService.send({
            server: manageService.productController.configureProductProcessDelete,
            data: data
        });
    };
    /**
     * 配置产品流程--上下移动
     */
    ProductService.prototype.configureProductProcessMove = function (data) {
        return this.netService.send({
            server: manageService.productController.configureProductProcessMove,
            data: data
        });
    };
    /**
     * 新增修改产品
     */
    ProductService.prototype.createOrModifyProduct = function (data) {
        return this.netService.send({
            server: manageService.productController.createOrModifyProduct,
            data: data
        });
    };
    /**
     * 删除产品
     */
    ProductService.prototype.deleteProduct = function (_a) {
        var id = _a.id;
        return this.netService.send({
            server: manageService.productController.deleteProduct,
            id: id
        });
    };
    /**
     * 查询所有产品 ---树形结构
     */
    ProductService.prototype.getAllProduct = function () {
        return this.netService.send({
            server: manageService.productController.getAllProduct,
        });
    };
    /**
     * 查询所有产品 ---树形结构 （新接口）
     */
    ProductService.prototype.getProductTree = function () {
        return this.netService.send({
            server: manageService.productController.getProductTree,
        });
    };
    /**
     * 查询产品名称及序列号 租金渠道
     */
    ProductService.prototype.getProductById = function (_a) {
        var id = _a.id;
        return this.netService.send({
            server: manageService.productController.getProductById,
            data: {
                id: id
            }
        });
    };
    /**
     *
     * @param param0 获取产品审批流程
     */
    ProductService.prototype.getProductConfigProcess = function (_a) {
        var productId = _a.productId;
        return this.netService.send({
            server: manageService.productController.getProductConfigProcess,
            data: {
                productId: productId
            }
        });
    };
    __decorate([
        Inject(NetService)
    ], ProductService.prototype, "netService", void 0);
    return ProductService;
}());
export { ProductService };
