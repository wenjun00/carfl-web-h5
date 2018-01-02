import { requestType } from '~/config/enum.config'

const CONTROLLER = 'stayApplyController'

export const stayApplyController = {
  /**
   * 查询所有留案申请记录
   */
  getAllStayApply: {
        controller: CONTROLLER,
        action: 'getAllStayApply',
        type: requestType.Get
    },
    /**
     * 审批
     */
    approveStayApply: {
        controller: CONTROLLER,
        action: 'approveStayApply',
        type: requestType.Post
    }
}
