import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
export class ScheduleJobService {
  @Inject()
  private netService: NetService
  /**
   * 获取定时任务列表
   */
  queryScheduleJobList(page) {
    return this.netService.send({
      server: manageService.scheduleJobController.queryScheduleJobList,
      page: page
    })
  }
  /**
   * 禁用
   */
  pauseScheduleJob({ jobGroup, jobName }) {
    return this.netService.send({
      server: manageService.scheduleJobController.pauseScheduleJob,
      data: {
        jobGroup: jobGroup,
        jobName: jobName
      }
    })
  }
  /**
   * 启用
   */
  resumeScheduleJob({ jobGroup, jobName }) {
    return this.netService.send({
      server: manageService.scheduleJobController.resumeScheduleJob,
      data: {
        jobGroup: jobGroup,
        jobName: jobName
      }
    })
  }
  /**
   * 批量管理
   */
  scheduleJobBatchManager() {
    return this.netService.send({
      server: manageService.scheduleJobController.scheduleJobBatchManager
    })
  }
}