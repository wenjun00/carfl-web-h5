var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { manageService } from '~/config/server/manage-service';
import { Inject } from "~/core/decorator";
var SystemLogsService = /** @class */ (function () {
    function SystemLogsService() {
    }
    /**
     * 导出系统日志
     */
    SystemLogsService.prototype.exportSystemLogs = function (_a) {
        var sysLogsIds = _a.sysLogsIds;
        return this.netService.send({
            server: manageService.systemLogsController.exportSystemLogs,
            data: {
                sysLogsIds: sysLogsIds
            }
        });
    };
    __decorate([
        Inject()
    ], SystemLogsService.prototype, "netService", void 0);
    return SystemLogsService;
}());
export { SystemLogsService };
