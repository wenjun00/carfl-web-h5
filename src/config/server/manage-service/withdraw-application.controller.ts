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
  获取客户订单信息(旧接口)
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
  },
  /**
  * 保存提前收回申请作为草稿
  */
  saveAdvanceRevokeApplicationAsDraft: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'saveAdvanceRevokeApplicationAsDraft',
    type: requestType.Post
  },
  /**
   * 新增提前收回申请
   */
  saveAdvanceRevokeApplication: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'saveAdvanceRevokeApplication',
    type: requestType.Post
  },
  /**
   * 获取收款申请记录
   */
  getGatheringApprovalList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getGatheringApprovalList',
    type: requestType.Get
  },
  /**
   * 查看申请详情
   */
  viewApplicationDetail: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'viewApplicationDetail',
    type: requestType.Get
  },
  /**
  获取客户订单信息(新接口)
   * 
   */
  getPersonalProductOrderInfoForAdvance: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getPersonalProductOrderInfoForAdvance',
    type: requestType.Get
  },
  /**
   * 获取提前收回收款项
   */
  getAdvanceRevokeItems: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAdvanceRevokeItems',
    type: requestType.Get
  }
}