import { requestType } from '~/config/enum.config'

const CONTROLLER = 'storageApplyController'

export const storageApplyController = {
  /**
   * 查询所有入库申请记录
   */
  getAllStorageApply: {
    controller: CONTROLLER,
    action: 'getAllStorageApply',
    type: requestType.Get
  }
}
