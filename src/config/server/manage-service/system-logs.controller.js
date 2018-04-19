// 系统日志controller
import { requestType } from '~/config/enum.config';
var SERVICE = 'service-manage';
var CONTROLLER = 'systemLogs';
export default {
    /**
     * 分页查询操作日志
     */
    querySystemLogsPage: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'querySystemLogsPage',
        type: requestType.Get
    },
    /**
     * 导出系统日志
     */
    exportSystemLogs: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'exportSystemLogs',
        type: requestType.Post
    }
};
