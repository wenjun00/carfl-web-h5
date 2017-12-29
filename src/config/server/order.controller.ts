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
  }
}
