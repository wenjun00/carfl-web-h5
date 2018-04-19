var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service';
var RoleResoService = /** @class */ (function () {
    function RoleResoService() {
    }
    /**
     * 重置资源图标
     */
    RoleResoService.prototype.resetResoIcon = function () {
        return this.netService.send({
            server: manageService.roleResoController.resetResoIcon,
        });
    };
    /**
     * 重置资源名称
     */
    RoleResoService.prototype.resetResoName = function () {
        return this.netService.send({
            server: manageService.roleResoController.resetResoName,
        });
    };
    /**
    * 修改资源图标
    */
    RoleResoService.prototype.modifyResoIcon = function (data) {
        return this.netService.send({
            server: manageService.roleResoController.modifyResoIcon,
            data: data
        });
    };
    /**
     * 修改资源名称
     */
    RoleResoService.prototype.modifyResoName = function (data) {
        return this.netService.send({
            server: manageService.roleResoController.modifyResoName,
            data: data
        });
    };
    /**
     * 查询所有角色资源
     */
    RoleResoService.prototype.getAllResource = function () {
        return this.netService.send({
            server: manageService.roleResoController.getAllResource
        });
    };
    /**
     * 根据父id查询子类分页
     */
    RoleResoService.prototype.getSonReso = function (_a, page) {
        var id = _a.id;
        return this.netService.send({
            server: manageService.roleResoController.getSonReso,
            data: {
                id: id
            },
            page: page
        });
    };
    /**
     * 获取系统目录菜单
     */
    RoleResoService.prototype.findRoleResoMenu = function () {
        return this.netService.send({
            server: manageService.roleResoController.findRoleResoMenu
        });
    };
    /**
     * 根据父id查询子类不分页
     */
    RoleResoService.prototype.getSonResoNoPage = function (_a) {
        var id = _a.id;
        return this.netService.send({
            server: manageService.roleResoController.getSonResoNoPage,
            data: {
                id: id
            }
        });
    };
    /**
     * 获取角色已有按钮和输入框
     */
    RoleResoService.prototype.findRoleResoResourceByRoleId = function (_a) {
        var roleIds = _a.roleIds;
        return this.netService.send({
            server: manageService.roleResoController.findRoleResoResourceByRoleId,
            data: {
                roleIds: roleIds
            }
        });
    };
    /**
     * 获取角色已有页面
     */
    RoleResoService.prototype.findRoleResoMenuByRoleId = function (_a) {
        var roleIds = _a.roleIds;
        return this.netService.send({
            server: manageService.roleResoController.findRoleResoMenuByRoleId,
            data: {
                roleIds: roleIds
            }
        });
    };
    __decorate([
        Inject(NetService)
    ], RoleResoService.prototype, "netService", void 0);
    return RoleResoService;
}());
export { RoleResoService };
