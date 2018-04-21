import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import {FilterService} from "~/utils/filter.service";
import { requestType } from "~/config/enum.config";
import store from "~/store"

export class WithdrawApplicationService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 获取销售收款申请信息
   */
  getSaleCollectMoneyApplicationInfo({ personalId, orderId }) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.getSaleCollectMoneyApplicationInfo,
      data: {
        personalId: personalId,
        orderId: orderId
      }
    })
  }
  /**
   * 获取提前结清信息
   */
  getAdvancePayoffApplicationInfo({ personalId, orderId }) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.getAdvancePayoffApplicationInfo,
      data: {
        personalId: personalId,
        orderId: orderId
      }
    })
  }
  /**
 * 获取提前收回信息
 */
  getAdvanceRevokeApplicationInfo({ personalId, orderId }) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.getAdvanceRevokeApplicationInfo,
      data: {
        personalId: personalId,
        orderId: orderId
      }
    })
  }
  /**
   * 获取客户订单信息（旧接口）
   */
  getPersonalProductOrderInfo({ idCard, customerName, mobileMain }) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.getPersonalProductOrderInfo,
      data: {
        idCard: idCard,
        customerName: customerName,
        mobileMain: mobileMain
      }
    })
  }

  /**
 * 获取提前收回信息
 */
  // getPersonalProductOrderInfo(data) {
  //   return this.netService.send({
  //     server: manageService.withdrawApplicationController.getPersonalProductOrderInfo,
  //     data: data,
  //   })
  // }
  /**
  * 获取销售收款项
  */
  getSaleCollectMoneyItems({ orderId }) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.getSaleCollectMoneyItems,
      data: {
        orderId: orderId
      }
    })
  }
  /**
   * 销售收款申请保存草稿
   */
  saveSaleCollectMoneyApplicationAsDraft(data) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.saveSaleCollectMoneyApplicationAsDraft,
      data: data
    })
  }
  /**
   * 销售收款申请 保存并提交
   */
  saveSaleCollectMoneyApplication(data) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.saveSaleCollectMoneyApplication,
      data: data
    })
  }
  /**
   * 获取提前结清收款项
   */
  getAdvancePayoffItems({ orderId }) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.getAdvancePayoffItems,
      data: {
        orderId: orderId
      }
    })
  }
  /**
   * 保存提前结清草稿
   */
  saveAdvancePayoffApplicationAsDraft(data) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.saveAdvancePayoffApplicationAsDraft,
      data: data
    })
  }
  /**
   * 保存并提交提前结清
   */
  saveAdvancePayoffApplication(data) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.saveAdvancePayoffApplication,
      data: data
    })
  }
  /**
   * 保存提前收回申请作为草稿
   */
  saveAdvanceRevokeApplicationAsDraft(data) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.saveAdvanceRevokeApplicationAsDraft,
      data: data
    })
  }
  saveAdvanceRevokeApplication(data) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.saveAdvanceRevokeApplication,
      data: data
    })
  }
  /**
   * 获取收款申请记录
   */
  getGatheringApprovalList(data, page) {
    const dateRange = FilterService.dateRanageFormat(data.dateRange)
    return this.netService.send({
      server: manageService.withdrawApplicationController.getGatheringApprovalList,
      data:{
        queryStartDate: dateRange.start,
        queryEndDate: dateRange.end,
        applicationType: data.applicationType, // 收款类型
        approvalStatus: data.approvalStatus, // 申请状态
        orderNumber: data.orderNumber, // 订单编号
      },
      page:page
    })
  }
  /**
   * 查看申请详情
   */
  viewApplicationDetail({ applicationId }) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.viewApplicationDetail,
      data: {
        applicationId: applicationId
      }
    })
  }
  /**
   * 获取客户订单信息（新接口）
   */
  getPersonalProductOrderInfoForAdvance({ idCard, customerName, mobileMain }) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.getPersonalProductOrderInfoForAdvance,
      data: {
        idCard: idCard,
        customerName: customerName,
        mobileMain: mobileMain
      }
    })
  }
  /**
   * 获取提前收回收款项
   */
  getAdvanceRevokeItems({ orderId }) {
    return this.netService.send({
      server: manageService.withdrawApplicationController.getAdvanceRevokeItems,
      data: {
        orderId: orderId
      }
    })
  }
}
