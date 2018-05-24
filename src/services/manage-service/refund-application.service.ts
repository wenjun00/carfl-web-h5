import {NetService} from '~/utils/net.service'
import {Inject, Debounce} from "~/core/decorator";
import {requestType} from "~/config/enum.config";
import {manageService} from '~/config/server/manage-service'
import {FilterService} from "~/utils/filter.service"


export class RefundApplicationService {
  @Inject(NetService)
  private netService: NetService


  /**
   * 确认付款
   */
  comfireRefund(data) {
    return this.netService.send({
      server: manageService.refundApplicationController.comfireRefund,
      data
    })
  }

  /**
   * 进件  付款审批
   */
  getApprovalRecord(data, page) {
    const dateRange = FilterService.dateRanageFormat(data.dateRange)
    return this.netService.send({
      server: manageService.refundApplicationController.getApprovalRecord,
      data: {
        startTime: dateRange.start,
        endTime: dateRange.end,
        orderNumber:data.orderNumber,
        timeSearch: data.timeSearch,
        approvalStatus: data.approvalStatus,
      },
      page: page
    })
  }

  /**
   * 进件  付款审批
   */
  getRefundApplicationById({refundId}) {
    return this.netService.send({
      server: manageService.refundApplicationController.getRefundApplicationById,
      data: {
        refundId: refundId
      }
    })
  }

  /**
   * 通过申请
   */
  passRefundApplication({refundId}) {
    return this.netService.send({
      server: manageService.refundApplicationController.passRefundApplication,
      data: {
        refundId: refundId
      }
    })
  }

  /**
   * 退回申请
   */
  returnRefundApplication({refundId}) {
    return this.netService.send({
      server: manageService.refundApplicationController.returnRefundApplication,
      data: {
        refundId: refundId
      }
    })
  }

  /**
   * 证件号、订单号、客户姓名查询订单/账户/付款信息
   */
  getAllMessageByParams(data) {
    return this.netService.send({
      server: manageService.refundApplicationController.getAllMessageByParams,
      data
    })
  }

  /**
   * 保存/保存并提交付款申请
   */
  saveSubmitApplication(data) {
    return this.netService.send({
      server: manageService.refundApplicationController.saveSubmitApplication,
      data
    })
  }

  /**
   * 获取付款明细项
   */
  getRefundItems({orderId}) {
    return this.netService.send({
      server: manageService.refundApplicationController.getRefundItems,
      data: {
        orderId: orderId
      }
    })
  }

  /**
   * 进件，财务----付款记录查询/付款查询
   */
  getRefundRecord(data, page) {
    const dateRange = FilterService.dateRanageFormat(data.dateRange)
    return this.netService.send({
      server: manageService.refundApplicationController.getRefundRecord,
      data: {
        refundName: data.refundName,
        timeSearch: data.timeSearch,
        startTime: dateRange.start,
        endTime: dateRange.end,
        approvalStatus: data.approvalStatus,
        orderNumber: data.orderNumber,
        refundType: data.refundType,
        applicationStatus: data.applicationStatus,
      },
      page: page
    })
  }
  /**
   * 根据订单编号查询总贷款金额
   */
  getQueryLoanTermById(data) {
    return this.netService.send({
      server: manageService.refundApplicationController.getQueryLoanTermById,
      data
    })
  }
  /**
   * 保存并提交付款申请
   */
  paymentApply(data){
    return this.netService.send({
      server: manageService.refundApplicationController.paymentApply,
      data
    })
  }
}
