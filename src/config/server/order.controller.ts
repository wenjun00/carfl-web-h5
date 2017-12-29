import { requestType } from '~/config/enum.config'

const CONTROLLER = 'orderController'

export const orderController = {
  /**
   * 查询案件
   */
  query: {
    controller: CONTROLLER,
    action: 'query',
    type: requestType.Get
  }
}
