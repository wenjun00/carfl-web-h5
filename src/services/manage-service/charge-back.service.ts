// 审批管理service
import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { FilterService } from "~/utils/filter.service"

export class ChargeBackService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 客户开户
   */
  createPersonalAccount(data) {
    return this.netService.send({
      server: manageService.chargeBackController.createPersonalAccount,
      data
    })
  }
  /**
   * 获取个人开户列表
   */
  getPersonalAccountList(data, page) {
    return this.netService.send({
      server: manageService.chargeBackController.getPersonalAccountList,
      data: {
        orderInfo: data.orderInfo,
        createDateStart: FilterService.dateFormat(data.createDateStart, 'yyyy-MM-dd'),
        createDateEnd: FilterService.dateFormat(data.createDateEnd, 'yyyy-MM-dd'),
        timeSearch: data.timeSearch
      },
      page: page
    })
  }
  /**
   * 
   * 获取划扣记录
   */
  getChargeRecordList(data, page) {
    let dataRange = FilterService.dateRanageFormat(data.dateRange)
    return this.netService.send({
      server: manageService.chargeBackController.getChargeRecordList,
      data: {
        startTime: dataRange.start,
        endTime: dataRange.end,
        payStatus: data.payStatus,
        personalInfo: data.personalInfo,
        personalId: data.personalId
      },
      page
    })
  }
  /**
   * 获取客户银行卡信息
   */
  getPersonalBank(data) {
    return this.netService.send({
      server: manageService.chargeBackController.getPersonalBank,
      data: data
    })
  }
  /**
   * 划扣
   */
  saveChargeback(data) {
    return this.netService.send({
      server: manageService.chargeBackController.saveChargeback,
      data: data
    })
  }
  /**
   * 解绑银行卡
   */
  removePersonalBank(data) {
    return this.netService.send({
      server: manageService.chargeBackController.removePersonalBank,
      data
    })
  }
  /**
   * 更换银行卡
   */
  updatePersonalBank(data) {
    return this.netService.send({
      server: manageService.chargeBackController.updatePersonalBank,
      data
    })
  }
}
