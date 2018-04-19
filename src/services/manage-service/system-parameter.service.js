var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service';
var SystemParameterService = /** @class */ (function () {
    function SystemParameterService() {
    }
    /**
     * 分页查询系统参数
     */
    SystemParameterService.prototype.querySystemParameterPage = function (data, page) {
        return this.netService.send({
            server: manageService.systemParameterController.querySystemParameterPage,
            data: data,
            page: page
        });
    };
    /**
     *
     * @param data 创建系统参数
     */
    SystemParameterService.prototype.createSystemParameter = function (data) {
        return this.netService.send({
            server: manageService.systemParameterController.createSystemParameter,
            data: data
        });
    };
    /**
    *
    * @param data 修改系统参数
    */
    SystemParameterService.prototype.updateSystemParameter = function (data) {
        return this.netService.send({
            server: manageService.systemParameterController.updateSystemParameter,
            data: data
        });
    };
    __decorate([
        Inject(NetService)
    ], SystemParameterService.prototype, "netService", void 0);
    return SystemParameterService;
}());
export { SystemParameterService };
