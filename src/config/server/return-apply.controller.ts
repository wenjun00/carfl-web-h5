import { requestType } from '~/config/enum.config'

const CONTROLLER = 'returnApplyController'
export const returnApplyController = {
  /**
   * 查询所有退案申请记录
   */
  getAllReturnApply: {
    controller: CONTROLLER,
    action: 'getAllReturnApply',
    type: requestType.Get
  },
  /**
   * 审批
   */
   approveReturnApply: {
    controller: CONTROLLER,
    action: 'approveReturnApply',
    type: requestType.Post
  }
}
