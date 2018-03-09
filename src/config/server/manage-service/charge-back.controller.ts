import { requestType } from '~/config/enum.config'
const SERVICE = 'service-manage'
const CONTROLLER = 'chargeBackController'
export default {
  /**
   * 客户开户
   */
  createPersonalAccount: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createPersonalAccount',
    type: requestType.Post
  },
  /**
   * 获取个人开户列表
   */
  getPersonalAccountList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getPersonalAccountList',
    type: requestType.Get
  },
  /**
   * 获取划扣记录
   */
  getChargeRecordList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getChargeRecordList',
    type: requestType.Get
  },
  /**
   * 获取客户银行卡信息
   */
  getPersonalBank: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getPersonalBank',
    type: requestType.Get
  },
  /**
   * 划扣
   */
  saveChargeback: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'saveChargeback',
    type: requestType.Post
  },
  /**
   * 解绑银行卡
   */
  removePersonalBank: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'removePersonalBank',
    type: requestType.Delete
  },
  /**
   * 更换银行卡
   */
  updatePersonalBank: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updatePersonalBank',
    type: requestType.Put
  }
}