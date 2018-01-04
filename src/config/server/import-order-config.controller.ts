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
  }
}
