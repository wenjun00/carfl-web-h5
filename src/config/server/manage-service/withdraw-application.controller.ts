import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'withdrawApplicationController'

export default {
  /**
   * 分页查询角色列表
   */
  getSaleCollectMoneyApplicationInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getSaleCollectMoneyApplicationInfo',
    type: requestType.Get
  },
  /**
   * 获取提前结清信息
   */
  getAdvancePayoffApplicationInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAdvancePayoffApplicationInfo',
    type: requestType.Get
  },
  /**
 * 获取提前收回信息
 */
  getAdvanceRevokeApplicationInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAdvanceRevokeApplicationInfo',
    type: requestType.Get
  },
  /**
  获取客户订单信息
  *
  */
  getPersonalProductOrderInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getPersonalProductOrderInfo',
    type: requestType.Get
  },
  /**
   * 获取销售收款项
   */
  getSaleCollectMoneyItems: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getSaleCollectMoneyItems',
    type: requestType.Get
  },
  /**
   * 销售收款申请保存草稿
   */
  saveSaleCollectMoneyApplicationAsDraft: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'saveSaleCollectMoneyApplicationAsDraft',
    type: requestType.Post
  },
  /**
   * 销售收款申请保存并提交
   */
  saveSaleCollectMoneyApplication: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'saveSaleCollectMoneyApplication',
    type: requestType.Post
  },
  /**
   * 获取提前结清收款项
   */
  getAdvancePayoffItems: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAdvancePayoffItems',
    type: requestType.Get
  },
  /**
   * 保存提前结清草稿
   */
  saveAdvancePayoffApplicationAsDraft: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'saveAdvancePayoffApplicationAsDraft',
    type: requestType.Post
  },
  /**
   * 保存并提交提前结清
   */
  saveAdvancePayoffApplication: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'saveAdvancePayoffApplication',
    type: requestType.Post
  }
}