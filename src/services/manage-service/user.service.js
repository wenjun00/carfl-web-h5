var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { manageService } from '~/config/server/manage-service';
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
import store from "~/store";
var UserService = /** @class */ (function () {
    function UserService() {
    }
    /**
     * 获取用户所属角色
     */
    UserService.prototype.findRolesByUserId = function (_a) {
        var userId = _a.userId;
        return this.netService.send({
            server: manageService.userController.findRolesByUserId,
            data: {
                userId: userId
            }
        });
    };
    /**
     * 用户注册
     * @param data
     */
    UserService.prototype.userRegister = function (data) {
        return this.netService.send({
            server: manageService.userController.userRegister,
            data: data
        });
    };
    /**
     * 查询用户列表菜单
     */
    UserService.prototype.findListboxByUserIdAndResoPid = function (resoPid) {
        return this.netService.send({
            server: manageService.userController.findListboxByUserIdAndResoPid,
            data: {
                userId: store.state.userData.id,
                resoPid: resoPid
            }
        });
    };
    /**
     * 用户分配列表菜单
     */
    UserService.prototype.userAllocateListbox = function (id, data) {
        return this.netService.send({
            server: manageService.userController.userAllocateListbox,
            data: {
                userId: store.state.userData.id,
                resoPid: id,
                userResourceList: data
            }
        });
    };
    /**
     * 用户分配权限
     */
    UserService.prototype.userAllocatePrivileges = function (data) {
        return this.netService.send({
            server: manageService.userController.userAllocatePrivileges,
            data: data
        });
    };
    /**
     * 获取用户数据权限
     */
    UserService.prototype.findUserPrivileges = function (_a) {
        var userId = _a.userId;
        return this.netService.send({
            server: manageService.userController.findUserPrivileges,
            data: {
                userId: userId
            }
        });
    };
    /**
     * 导出用户列表
     */
    UserService.prototype.exportUserList = function (data) {
        return this.netService.send({
            server: manageService.userController.exportUserList,
            data: data
        });
    };
    __decorate([
        Inject(NetService)
    ], UserService.prototype, "netService", void 0);
    return UserService;
}());
export { UserService };
