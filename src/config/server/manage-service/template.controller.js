// 系统参数controller
import { requestType } from '~/config/enum.config';
var SERVICE = 'service-manage';
var CONTROLLER = 'templateController';
export default {
    /**
     * 查询模板
     */
    selectTemplate: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'selectTemplate',
        type: requestType.Get
    },
    /**
     * 查看当前模板
     */
    getTemplateMessage: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getTemplateMessage',
        type: requestType.Get
    },
    /**
     * 生成模板
     */
    createTemplate: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'createTemplate',
        type: requestType.Post
    },
    /**
     * 删除模板
     */
    deleteTemplate: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'deleteTemplate',
        type: requestType.Delete
    },
    /**
     * 修改模板
     */
    updateTemplate: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'updateTemplate',
        type: requestType.Put
    }
};
