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
  getChargeRecordList(data) {
    return this.netService.send({
      server: manageService.chargeBackController.getChargeRecordList,
      data: data
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
}
