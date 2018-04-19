var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service';
var PersonalMaterialService = /** @class */ (function () {
    function PersonalMaterialService() {
    }
    /**
     * 分页查询客户素材
     */
    PersonalMaterialService.prototype.getAllPersonalMaterial = function (data, page) {
        return this.netService.send({
            server: manageService.personalMaterialController.getAllPersonalMaterial,
            data: data,
            page: page
        });
    };
    /**
     * 新增/修改客户素材
     */
    PersonalMaterialService.prototype.createOrModifyPersonalMaterial = function (data) {
        return this.netService.send({
            server: manageService.personalMaterialController.createOrModifyPersonalMaterial,
            data: data
        });
    };
    /**
     * 必传/不必传
     */
    PersonalMaterialService.prototype.isNecessary = function (data) {
        return this.netService.send({
            server: manageService.personalMaterialController.isNecessary,
            data: data
        });
    };
    /**
     * 勾选客户素材
     */
    PersonalMaterialService.prototype.select = function (data) {
        return this.netService.send({
            server: manageService.personalMaterialController.select,
            data: data
        });
    };
    /**
     * 删除客户素材
     */
    PersonalMaterialService.prototype.deletePersonalMaterial = function (_a) {
        var id = _a.id;
        return this.netService.send({
            server: manageService.personalMaterialController.deletePersonalMaterial,
            data: {
                id: id
            }
        });
    };
    /**
     * 展示全部客户素材
     */
    PersonalMaterialService.prototype.getAllPersonalMaterialNoPage = function (_a) {
        var productId = _a.productId;
        return this.netService.send({
            server: manageService.personalMaterialController.getAllPersonalMaterialNoPage,
            data: {
                productId: productId
            }
        });
    };
    /**
    * 新增/修改客户素材类型
    */
    PersonalMaterialService.prototype.createOrModifyType = function (data) {
        return this.netService.send({
            server: manageService.personalMaterialController.createOrModifyType,
            data: data
        });
    };
    __decorate([
        Inject(NetService)
    ], PersonalMaterialService.prototype, "netService", void 0);
    return PersonalMaterialService;
}());
export { PersonalMaterialService };
