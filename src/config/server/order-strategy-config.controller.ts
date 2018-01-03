import { requestType } from '~/config/enum.config'

const CONTROLLER = 'orderStrategyConfigs'

export const orderStrategyConfigController = {
  /**
   * 策略分案配置查询
   */
  query: {
    controller: CONTROLLER,
    action: 'query',
    type: requestType.Get
  },
  /**
   * 修改策略配置
   */
  modify: {
    controller: CONTROLLER,
    action: 'modify',
    type: requestType.Post
  },
  /**
   * 创建策略分案配置
   */
  createOrderStrategyConfig: {
    controller: CONTROLLER,
    action: 'createOrderStrategyConfig',
    type: requestType.Post
  }
}