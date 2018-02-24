import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class PaymentScheduleService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 客户还款查询
   */
  getCustomerPayments(data, page) {
    return this.netService.send({
      server: manageService.paymentScheduleController.getCustomerPayments,
      data: data,
      page: page
    })
  }
  /**
   * 还款详情（彭长须接口）
   */
  getPaymentRecordDetail({ personalId, businessId }) {
    return this.netService.send({
      server: manageService.paymentScheduleController.getPaymentRecordDetail,
      data: {
        personalId: personalId,
        businessId: businessId
      }
    })
  }
  /**
   * 还款总揽
   */
  getRepaymentOverview({ orderId }) {
    return this.netService.send({
      server: manageService.paymentScheduleController.getRepaymentOverview,
      data: {
        orderId: orderId
      }
    })
  }
  /**
   * 还款详情(吴小川接口)
   */
  getPaymentDetail({ orderId }) {
    return this.netService.send({
      server: manageService.paymentScheduleController.getPaymentDetail,
      data: {
        orderId: orderId
      }
    })
  }
  /**
   * 查看凭证
   */
  checkTheVoucher({ businessId }) {
    return this.netService.send({
      server: manageService.paymentScheduleController.checkTheVoucher,
      data: {
        businessId: businessId
      }
    })
  }
  /**
   * 财务还款详情
   */
  getPaymentScheduleDetail({ orderId }) {
    return this.netService.send({
      server: manageService.paymentScheduleController.getPaymentScheduleDetail,
      data: {
        orderId: orderId
      }
    })
  }
  /**
   * 财务确认还款信息
   */
  getCustomerScheduleBillDetail({ orderId }) {
    return this.netService.send({
      server: manageService.paymentScheduleController.getCustomerScheduleBillDetail,
      data: {
        orderId: orderId
      }
    })
  }
  /**
   * 财务带搜索的划扣记录
   */
  getCustomerDeductionRecord({ orderId, personalId }) {
    return this.netService.send({
      server: manageService.paymentScheduleController.getCustomerDeductionRecord,
      data: {
        orderId: orderId,
        personalId: personalId
      }
    })
  }
  /**
   * 保存客户还款信息
   */
  saveCustomerPaymentInfo(data) {
    return this.netService.send({
      server: manageService.paymentScheduleController.saveCustomerPaymentInfo,
      data
    })
  }
  /**
   * 保存客户还款草稿信息
   */
  saveCustomerPaymentInfoAsDraft(data) {
    return this.netService.send({
      server: manageService.paymentScheduleController.saveCustomerPaymentInfoAsDraft,
      data
    })
  }
}