var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//backlog-controller : 待办事项管理
import { manageService } from '~/config/server/manage-service';
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
var BackLogService = /** @class */ (function () {
    function BackLogService() {
    }
    /**
     * 角色分配代办事项
     */
    BackLogService.prototype.roleAllocateBacklogs = function (data) {
        return this.netService.send({
            server: manageService.backLogController.roleAllocateBacklogs,
            data: data
        });
    };
    /**
     * 查询所有待办事项
     */
    BackLogService.prototype.queryBacklog = function () {
        return this.netService.send({
            server: manageService.backLogController.queryBacklog
        });
    };
    /**
     * 查询角色下待办事项
    */
    BackLogService.prototype.findBacklogByRoleId = function (_a) {
        var roleIds = _a.roleIds;
        return this.netService.send({
            server: manageService.backLogController.findBacklogByRoleId,
            data: {
                roleIds: roleIds
            }
        });
    };
    /**
     * 查询当前用户的待办事项
     */
    BackLogService.prototype.queryUserBacklog = function () {
        return this.netService.send({
            server: manageService.backLogController.queryUserBacklog
        });
    };
    __decorate([
        Inject(NetService)
    ], BackLogService.prototype, "netService", void 0);
    return BackLogService;
}());
export { BackLogService };
