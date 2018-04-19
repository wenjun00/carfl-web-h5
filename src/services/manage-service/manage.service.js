var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { manageService } from '~/config/server/manage-service';
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
var ManageService = /** @class */ (function () {
    function ManageService() {
    }
    /**
     * 获取组织
     */
    ManageService.prototype.getAllDepartment = function () {
        return this.netService.send({
            server: manageService.departmentController.getAllDepartment
        });
    };
    /**
     * 获取分页查询角色
     * @param
     */
    ManageService.prototype.queryRolePage = function (_a, page) {
        var roleName = _a.roleName, roleStatus = _a.roleStatus, userId = _a.userId;
        return this.netService.send({
            server: manageService.roleController.queryRolePage,
            data: {
                roleName: roleName,
                roleStatus: roleStatus,
                userId: userId
            },
            page: page
        });
    };
    /**
     * 分条件查询组织下用户列表
     */
    ManageService.prototype.getUsersByDeptPage = function (data, page) {
        return this.netService.send({
            server: manageService.userController.getUsersByDeptPage,
            data: data,
            page: page
        });
    };
    /**
     * 新增用户
     */
    ManageService.prototype.createUser = function (data) {
        return this.netService.send({
            server: manageService.userController.createUser,
            data: data
        });
    };
    /**
     * 修改用户
     */
    ManageService.prototype.updateUser = function (data) {
        return this.netService.send({
            server: manageService.userController.updateUser,
            data: data
        });
    };
    /**
     * 修改角色
     */
    ManageService.prototype.updateRole = function (data) {
        return this.netService.send({
            server: manageService.roleController.updateRole,
            data: data
        });
    };
    /**
     * 新增角色
     */
    ManageService.prototype.createRole = function (data) {
        return this.netService.send({
            server: manageService.roleController.createRole,
            data: data
        });
    };
    /**
     * 删除角色
     */
    ManageService.prototype.deleteRole = function (_a) {
        var roleId = _a.roleId;
        return this.netService.send({
            server: manageService.roleController.deleteRole,
            data: {
                roleId: roleId
            }
        });
    };
    /**
     * 根据角色获取用户列表
     */
    ManageService.prototype.getUserByRoleIdPage = function (data, page) {
        return this.netService.send({
            server: manageService.roleController.getUserByRoleIdPage,
            data: data,
            page: page
        });
    };
    /**
     * 系统日志分页查询
     * @param data
     * @param page
     */
    ManageService.prototype.querySystemLogsPage = function (data, page) {
        return this.netService.send({
            server: manageService.systemLogsController.querySystemLogsPage,
            data: data,
            page: page
        });
    };
    /**
     * 系统备份分页查询
     */
    ManageService.prototype.querySystemBackupPage = function (data, page) {
        return this.netService.send({
            server: manageService.systemBackupController.querySystemBackupPage,
            data: data,
            page: page
        });
    };
    /**
     * 删除系统备份
     */
    ManageService.prototype.deleteSystemBackup = function (_a) {
        var id = _a.id;
        return this.netService.send({
            server: manageService.systemBackupController.deleteSystemBackup,
            data: {
                id: id
            }
        });
    };
    /**
     * 新增系统备份
     */
    ManageService.prototype.createSystemBackup = function () {
        return this.netService.send({
            server: manageService.systemBackupController.createSystemBackup,
        });
    };
    /**
     * 系统参数分页查询
     */
    ManageService.prototype.querySystemParameterPage = function (data, page) {
        return this.netService.send({
            server: manageService.systemParameterController.querySystemParameterPage,
            data: data,
            page: page
        });
    };
    /**
     *  用户角色分配
     */
    ManageService.prototype.userAllocateRoles = function (data) {
        return this.netService.send({
            server: manageService.userController.userAllocateRoles,
            data: data
        });
    };
    /**
     * 用户批量分配角色
     * @param data
     */
    ManageService.prototype.userBatchAllocateRoles = function (data) {
        return this.netService.send({
            server: manageService.userController.userBatchAllocateRoles,
            data: data
        });
    };
    __decorate([
        Inject(NetService)
    ], ManageService.prototype, "netService", void 0);
    return ManageService;
}());
export { ManageService };
