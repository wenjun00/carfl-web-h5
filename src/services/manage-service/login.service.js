var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { manageService } from '~/config/server';
import { NetService } from '~/utils/net.service';
import { Inject, Debounce } from "~/core/decorator";
import md5 from 'md5';
var LoginService = /** @class */ (function () {
    function LoginService() {
    }
    /**
     * 登录
     */
    LoginService.prototype.login = function (_a) {
        var username = _a.username, password = _a.password, loginDevice = _a.loginDevice, loginType = _a.loginType;
        return this.netService.send({
            server: manageService.loginController.login,
            data: {
                userUsername: username,
                userPassword: md5(password),
                loginDevice: loginDevice,
                loginType: loginType
            }
        });
    };
    /**
     * 通过token登录
     */
    LoginService.prototype.getUserByToken = function () {
        return this.netService.send({
            server: manageService.loginController.getUserByToken
        });
    };
    /**
     *  重置密码
     */
    LoginService.prototype.resetPassword = function (_a) {
        var userId = _a.userId;
        return this.netService.send({
            server: manageService.loginController.resetPassword,
            data: {
                userId: userId
            }
        });
    };
    /**
     * 启用、禁用设备
     */
    LoginService.prototype.disableDevice = function (_a) {
        var userIds = _a.userIds, userType = _a.userType, userStatus = _a.userStatus;
        return this.netService.send({
            server: manageService.loginController.disableDevice,
            data: {
                userIds: userIds,
                userType: userType,
                userStatus: userStatus
            }
        });
    };
    /**
     * 启用、停用设备锁
     */
    LoginService.prototype.enableDeviceKey = function (_a) {
        var userIds = _a.userIds, userType = _a.userType, userValidate = _a.userValidate;
        return this.netService.send({
            server: manageService.loginController.enableDeviceKey,
            data: {
                userIds: userIds,
                userType: userType,
                userValidate: userValidate
            }
        });
    };
    /**
     * 获取当前用户设备
     */
    LoginService.prototype.getUserDevice = function (_a) {
        var userId = _a.userId;
        return this.netService.send({
            server: manageService.loginController.getUserDevice,
            data: {
                userId: userId
            }
        });
    };
    /**
     * 重置设备
     */
    LoginService.prototype.resetDevice = function (_a) {
        var userIds = _a.userIds, userType = _a.userType;
        return this.netService.send({
            server: manageService.loginController.resetDevice,
            data: {
                userIds: userIds,
                userType: userType
            }
        });
    };
    /**
     * 注销用户
     */
    LoginService.prototype.logout = function () {
        return this.netService.send({
            server: manageService.loginController.logout
        });
    };
    /**
     * 修改密码
     */
    LoginService.prototype.modifyPassword = function (data) {
        return this.netService.send({
            server: manageService.loginController.modifyPassword,
            data: data
        });
    };
    __decorate([
        Inject(NetService)
    ], LoginService.prototype, "netService", void 0);
    __decorate([
        Debounce()
    ], LoginService.prototype, "login", null);
    return LoginService;
}());
export { LoginService };
