// 审批管理service
import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class ApprovalService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 分页查询审批原因
   */
  auditResourcePool(data, page) {
    return this.netService.send({
      server: manageService.approvalController.auditResourcePool,
      data: data,
      page: page
    })
  }
  /**
   * 
   * @param data 领取订单到我的审核
   */
  batchReceiveApproval(data) {
    return this.netService.send({
      server: manageService.approvalController.batchReceiveApproval,
      data: data
    })
  }
  /**
   * 我的审核
   */
  getMyApprovalOrder(data, page) {
    return this.netService.send({
      server: manageService.approvalController.getMyApprovalOrder,
      data: data,
      page: page
    })
  }
  /**
   * 订单查询、内审、黑名单、灰名单
   */
  approvalOrderSearch(data, page) {
    return this.netService.send({
      server: manageService.approvalController.approvalOrderSearch,
      data: data,
      page: page
    })
  }
  /**
   * 内审、黑名单、灰名单移出
   */
  removeRiskStatus({ orderIds }) {
    return this.netService.send({
      server: manageService.approvalController.removeRiskStatus,
      data: {
        orderIds: orderIds
      }
    })
  }
  /**
   * 审核记录表查询
   */
  getAuditRecord(data, page) {
    return this.netService.send({
      server: manageService.approvalController.getAuditRecord,
      data: data,
      page: page
    })
  }
  /**
   * 订单查询、进度查询
   */
  findOrderApproveRecord({ orderId }) {
    return this.netService.send({
      server: manageService.approvalController.findOrderApproveRecord,
      data: {
        orderId: orderId
      }
    })
  }
  /**
   * 退回资源池
   */
  goBackResourcePool({ orderId }) {
    return this.netService.send({
      server: manageService.approvalController.goBackResourcePool,
      data: {
        orderId: orderId
      }
    })
  }
  /**
   * 提交内审&灰名单
   */
  submitInternalAuditOrGreyList(data) {
    return this.netService.send({
      server: manageService.approvalController.submitInternalAuditOrGreyList,
      data: data
    })
  }
  /**
   * 提交黑名单&拒绝
   */
  submitBlackListOrRefuse(data) {
    return this.netService.send({
      server: manageService.approvalController.submitBlackListOrRefuse,
      data: data
    })
  }
  /**
   * 退件
   */
  goBackInComing(data) {
    return this.netService.send({
      server: manageService.approvalController.goBackInComing,
      data: data
    })
  }
  /**
   * 审批通过
   */
  passApproval(data) {
    return this.netService.send({
      server: manageService.approvalController.passApproval,
      data: data
    })
  }
  /**
   * 订单流程查询
   */
  getOrderProcess({ orderId }) {
    return this.netService.send({
      server: manageService.approvalController.getOrderProcess,
      data: {
        orderId: orderId
      }
    })
  }
}
