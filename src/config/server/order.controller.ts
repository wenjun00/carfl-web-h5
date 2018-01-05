import { requestType } from '~/config/enum.config'

const CONTROLLER = 'order'

export const orderController = {
  /**
   * 查询案件
   */
  query: {
    controller: CONTROLLER,
    action: 'query',
    type: requestType.Get
  },
  /**
   * 待接收案件
   */
   queryTeamAssigned: {
    controller: CONTROLLER,
    action: 'queryTeamAssigned',
    type: requestType.Get
  },
  /**
   * 按id查看案件详情
   */
   getOrder: {
    controller: CONTROLLER,
    action: 'getOrder',
    type: requestType.Get
  },
  /**
   * 手动分案
   */
  manualDistribute: {
    controller: CONTROLLER,
    action: 'distribute',
    type: requestType.Post
  }
}
