import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'stagesMatch'

export default {
  /**
   * 分期冲抵顺序配置分页查询
   */
  queryStagesMatchPage: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryStagesMatchPage',
    type: requestType.Get
  },
  /**
   * 修改分期冲抵顺序配置顺序
   */
  updateStagesMatch:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateStagesMatch',
    type: requestType.Post
  }

}
