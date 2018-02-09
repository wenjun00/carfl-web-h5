import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'scheduleJobController'

export default {
  /**
   * 获取定时任务列表
   */
  queryScheduleJobList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryScheduleJobList',
    type: requestType.Get
  },
  /**
   * 暂停
   */
  pauseScheduleJob: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'pauseScheduleJob',
    type: requestType.Post
  },
  /**
   * 启用
   */
  resumeScheduleJob: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'resumeScheduleJob',
    type: requestType.Post
  },
  /**
   * 批量管理
   */
  scheduleJobBatchManager: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'scheduleJobBatchManager',
    type: requestType.Post
  }
}