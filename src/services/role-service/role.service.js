var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { businessService } from '~/config/server';
import { Inject } from "~/core/decorator";
var RoleService = /** @class */ (function () {
    function RoleService() {
    }
    /**
     * 获取所有角色
     */
    RoleService.prototype.queryRolePage = function () {
        console.log(24);
        return this.netService.send({
            server: businessService.roleController.queryRolePage,
            data: {
                page: 1,
                size: 10
            }
        });
    };
    __decorate([
        Inject()
    ], RoleService.prototype, "netService", void 0);
    return RoleService;
}());
export { RoleService };
