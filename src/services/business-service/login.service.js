var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { businessService } from '~/config/server';
import { Inject, Debounce } from "~/core/decorator";
var LoginService = /** @class */ (function () {
    function LoginService() {
    }
    /**
     * 登录
     */
    LoginService.prototype.login = function (_a) {
        var username = _a.username, password = _a.password;
        return this.netService.send({
            server: businessService.loginController.login,
            data: {
                username: username,
                password: password
            }
        });
    };
    /**
     * 通过token获取用户信息
     */
    LoginService.prototype.getUserByToken = function (token) {
        return this.netService.send({
            server: businessService.loginController.getUserByToken,
            headers: {
                'X-UserToken': token
            }
        });
    };
    __decorate([
        Inject()
    ], LoginService.prototype, "netService", void 0);
    __decorate([
        Debounce()
    ], LoginService.prototype, "login", null);
    return LoginService;
}());
export { LoginService };
