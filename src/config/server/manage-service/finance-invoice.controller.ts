//待办事项管理 backlog-controller
import { requestType } from '~/config/enum.config'
const SERVICE = 'service-manage'
const CONTROLLER = 'financeInvoiceController'
export default {
  /**
   * 财务开票列表
   */
  getFinanceInvoiceList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getFinanceInvoiceList',
    type: requestType.Get
  },
  /**
   * 新增财务开票
   */
  saveFinanceInvoiceRecord: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'saveFinanceInvoiceRecord',
    type: requestType.Post
  },
   /**
   * 获取财务附件
   */
  getFinanceUploadResources: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getFinanceUploadResources',
    type: requestType.Get
  }

}