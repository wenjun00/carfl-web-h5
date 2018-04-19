var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { businessService } from '~/config/server';
import { Inject } from "~/core/decorator";
var ResourceSerivce = /** @class */ (function () {
    function ResourceSerivce() {
    }
    /**
     * 获取资源Hash值
     */
    ResourceSerivce.prototype.getResourceHash = function () {
        return this.netService.send({
            server: businessService.resourceController.getResourceHash,
        });
    };
    /**
    * 获取资源数据
    */
    ResourceSerivce.prototype.getResourceData = function () {
        return this.netService.send({
            server: businessService.resourceController.getResourceData,
        });
    };
    __decorate([
        Inject()
    ], ResourceSerivce.prototype, "netService", void 0);
    return ResourceSerivce;
}());
export { ResourceSerivce };
