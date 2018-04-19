var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { manageService } from '~/config/server/manage-service';
import { Inject } from "~/core/decorator";
var ScheduleJobService = /** @class */ (function () {
    function ScheduleJobService() {
    }
    /**
     * 获取定时任务列表
     */
    ScheduleJobService.prototype.queryScheduleJobList = function (page) {
        return this.netService.send({
            server: manageService.scheduleJobController.queryScheduleJobList,
            page: page
        });
    };
    /**
     * 禁用
     */
    ScheduleJobService.prototype.pauseScheduleJob = function (_a) {
        var jobGroup = _a.jobGroup, jobName = _a.jobName;
        return this.netService.send({
            server: manageService.scheduleJobController.pauseScheduleJob,
            data: {
                jobGroup: jobGroup,
                jobName: jobName
            }
        });
    };
    /**
     * 启用
     */
    ScheduleJobService.prototype.resumeScheduleJob = function (_a) {
        var jobGroup = _a.jobGroup, jobName = _a.jobName;
        return this.netService.send({
            server: manageService.scheduleJobController.resumeScheduleJob,
            data: {
                jobGroup: jobGroup,
                jobName: jobName
            }
        });
    };
    /**
     * 批量管理
     */
    ScheduleJobService.prototype.scheduleJobBatchManager = function () {
        return this.netService.send({
            server: manageService.scheduleJobController.scheduleJobBatchManager
        });
    };
    __decorate([
        Inject()
    ], ScheduleJobService.prototype, "netService", void 0);
    return ScheduleJobService;
}());
export { ScheduleJobService };
