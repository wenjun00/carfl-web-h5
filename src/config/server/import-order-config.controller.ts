import { requestType } from '~/config/enum.config'

const CONTROLLER = 'importOrderConfigController'
export const importOrderConfigController = {
  /**
   * 新增Excel配置模板
   */
  createImportConfig: {
    controller: CONTROLLER,
    action: 'createImportConfig',
    type: requestType.Post
  },
  /**
   * 查询Excel配置模板
   */
  getAllImportConfig: {
    controller: CONTROLLER,
    action: 'getAllImportConfig',
    type: requestType.Get
  },
  /**
   * 获取所有字段
   */
  getAllAttribute: {
    controller: CONTROLLER,
    action: 'getAllAttribute',
    type: requestType.Get
  },
  /**
   * 修改Excel配置模板
   */
  modifyImportConfig: {
    controller: CONTROLLER,
    action: 'modifyImportConfig',
    type: requestType.Put
  },
  /**
   * 删除Excel配置模板
   */
  deleteImportConfig: {
    controller: CONTROLLER,
    action: 'deleteImportConfig',
    type: requestType.Delete
  },
  /**
   * 通过ID获取模板配置集合
   */
  getImportOrderById: {
    controller: CONTROLLER,
    action: 'getImportOrderById',
    type: requestType.Get
  }
}
