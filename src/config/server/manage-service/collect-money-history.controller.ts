// 收款Controller
import { requestType } from '~/config/enum.config'
const SERVICE = 'service-manage'
const CONTROLLER = 'collectMoneyHistoryController'
export default {
  /**
   * 获取收款列表
   */
  collectMoneyHistoryList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'collectMoneyHistoryList',
    type: requestType.Get
  },
  /**
   * 申请详情
   */
  withdrawApplicationDetail: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'withdrawApplicationDetail',
    type: requestType.Get
  },
  /**
   * 保存收款历史
   */
  saveCollectMoneyHistory: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'saveCollectMoneyHistory',
    type: requestType.Post
  },
  /**
   * 保存收款历史草稿
   */
  saveCollectMoneyHistoryAsDraft: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'saveCollectMoneyHistoryAsDraft',
    type: requestType.Post
  }
}