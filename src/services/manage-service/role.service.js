var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { manageService } from '~/config/server/manage-service';
import { Inject } from "~/core/decorator";
var RoleService = /** @class */ (function () {
    function RoleService() {
    }
    /**
     * 获取所有角色
     */
    RoleService.prototype.queryRolePage = function (data, page) {
        return this.netService.send({
            server: manageService.roleController.queryRolePage,
            data: data,
            page: page
        });
    };
    /**
     * 更新角色信息
     */
    RoleService.prototype.updateRole = function (data) {
        return this.netService.send({
            server: manageService.roleController.updateRole,
            data: data
        });
    };
    /**
   * 新增角色
   */
    RoleService.prototype.createRole = function (data) {
        return this.netService.send({
            server: manageService.roleController.createRole,
            data: data
        });
    };
    /**
  * 删除角色
  */
    RoleService.prototype.deleteRole = function (data) {
        return this.netService.send({
            server: manageService.roleController.deleteRole,
            data: data
        });
    };
    /**
   * 通过角色id查询用户分页
   */
    RoleService.prototype.getUserByRoleIdPage = function (data, page) {
        return this.netService.send({
            server: manageService.roleController.getUserByRoleIdPage,
            data: data,
            page: page
        });
    };
    /**
   * 根据角色ID 查询角色对应的权限资源
   */
    RoleService.prototype.findResourceByRoleId = function (_a) {
        var roleId = _a.roleId;
        return this.netService.send({
            server: manageService.roleController.findResourceByRoleId,
            data: {
                roleId: roleId
            }
        });
    };
    /**
     * 角色分配资源
     */
    RoleService.prototype.roleAllocateResources = function (_a) {
        var roleId = _a.roleId, resourcesId = _a.resourcesId;
        return this.netService.send({
            server: manageService.roleController.roleAllocateResources,
            data: {
                roleId: roleId,
                resourcesId: resourcesId
            }
        });
    };
    /**
     * 导出
     */
    RoleService.prototype.exportRole = function (data) {
        return this.netService.send({
            server: manageService.roleController.exportRole,
            data: data
        });
    };
    __decorate([
        Inject()
    ], RoleService.prototype, "netService", void 0);
    return RoleService;
}());
export { RoleService };
