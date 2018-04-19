var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { manageService } from '~/config/server/manage-service';
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
var UserDeviceService = /** @class */ (function () {
    function UserDeviceService() {
    }
    /**
     * 一键启用设备
     */
    UserDeviceService.prototype.enableDevice = function (_a) {
        var userIds = _a.userIds, userStatus = _a.userStatus, userType = _a.userType;
        return this.netService.send({
            server: manageService.userDeviceController.enableDevice,
            data: {
                userIds: userIds,
                userStatus: userStatus,
                userType: userType
            }
        });
    };
    /**
     * 一键禁用设备
     */
    UserDeviceService.prototype.disableDevice = function (_a) {
        var userIds = _a.userIds, userStatus = _a.userStatus, userType = _a.userType;
        return this.netService.send({
            server: manageService.userDeviceController.disableDevice,
            data: {
                userIds: userIds,
                userStatus: userStatus,
                userType: userType
            }
        });
    };
    /**
    * 一键启用设备锁
    */
    UserDeviceService.prototype.enableDeviceLock = function (_a) {
        var userIds = _a.userIds, userValidate = _a.userValidate, userType = _a.userType;
        return this.netService.send({
            server: manageService.userDeviceController.enableDeviceLock,
            data: {
                userIds: userIds,
                userValidate: userValidate,
                userType: userType
            }
        });
    };
    /**
   * 一键停用设备锁
   */
    UserDeviceService.prototype.disableDeviceLock = function (_a) {
        var userIds = _a.userIds, userValidate = _a.userValidate, userType = _a.userType;
        return this.netService.send({
            server: manageService.userDeviceController.disableDeviceLock,
            data: {
                userIds: userIds,
                userValidate: userValidate,
                userType: userType
            }
        });
    };
    /**
  * 一键重置设备
  */
    UserDeviceService.prototype.resetDevice = function (_a) {
        var userIds = _a.userIds, userType = _a.userType;
        return this.netService.send({
            server: manageService.userDeviceController.resetDevice,
            data: {
                userIds: userIds,
                userType: userType
            }
        });
    };
    /**
     * 获取所选用户的设备
     */
    UserDeviceService.prototype.getUserDevice = function (_a) {
        var ids = _a.ids;
        return this.netService.send({
            server: manageService.userDeviceController.getUserDevice,
            data: {
                ids: ids
            }
        });
    };
    __decorate([
        Inject(NetService)
    ], UserDeviceService.prototype, "netService", void 0);
    return UserDeviceService;
}());
export { UserDeviceService };
