// 客户信息
import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'paymentScheduleController'

export default {
  /**
   * 客户还款查询
   */
  getCustomerPayments: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCustomerPayments',
    type: requestType.Get
  },
  /**
   * 还款详情(彭长须接口)
   */
  getPaymentRecordDetail: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getPaymentRecordDetail',
    type: requestType.Get
  },
  /**
   * 还款总揽
   */
  getRepaymentOverview: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getRepaymentOverview',
    type: requestType.Get
  },
  /**
   * 还款详情（吴小川接口）
   */
  getPaymentDetail: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getPaymentDetail',
    type: requestType.Get
  },
  /**
   * 查看凭证
   */
  checkTheVoucher: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'checkTheVoucher',
    type: requestType.Get
  },
  /**
   * 财务还款详情
   */
  getPaymentScheduleDetail: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getPaymentScheduleDetail',
    type: requestType.Get
  },
  /**
   * 财务确认还款信息
   */
  getCustomerScheduleBillDetail: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCustomerScheduleBillDetail',
    type: requestType.Get
  },
  /**
   * 财务带搜索的划扣记录
   */
  getCustomerDeductionRecord: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCustomerDeductionRecord',
    type: requestType.Get
  },
  /**
   * 保存客户还款信息
   */
  saveCustomerPaymentInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'saveCustomerPaymentInfo',
    type: requestType.Post
  },
  /**
   * 保存客户还款草稿信息
   */
  saveCustomerPaymentInfoAsDraft: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'saveCustomerPaymentInfoAsDraft',
    type: requestType.Post
  },
  /**
   *  客户还款当期补传凭证查看当期凭证
   */
  getFinanceUploadResource:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getFinanceUploadResource',
    type: requestType.Get
  },
  /**
   *  客户还款当期补传凭证保存当期补传凭证
   *
   */
  saveScheduleUploadResources:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'saveScheduleUploadResources',
    type: requestType.Post
  }
}
