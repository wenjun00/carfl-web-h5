import {NetService} from '~/utils/net.service'
import {Inject, Debounce} from "~/core/decorator";
import {requestType} from "~/config/enum.config";
import {manageService} from '~/config/server/manage-service'
import {FilterService} from "~/utils/filter.service";


export class PersonalService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 根据客户三项查询历史订单
   */
  getCustomerHistoryFinanceInfo(data?) {
    return this.netService.send({
      server: manageService.personalController.getCustomerHistoryFinanceInfo,
      data: data
    })
  }

  /**
   * 客户信息查询
   */
  getPersonalMessage({personalId}) {
    return this.netService.send({
      server: manageService.personalController.getPersonalMessage,
      data: {
        personalId: personalId
      }
    })
  }

  /**
   * 客户号获取开户信息
   */
  getBankByClientNumber({clientNumber, settleChannel}) {
    return this.netService.send({
      server: manageService.personalController.getBankByClientNumber,
      data: {
        clientNumber: clientNumber,
        settleChannel: settleChannel
      }
    })
  }

  /**
   * 获取客户开户列表
   */
  getCustomerAccountList(data, page) {
    return this.netService.send({
      server: manageService.personalController.getCustomerAccountList,
      data: data,
      page: page
    })
  }

  /**
   * 获取客户签约列表
   */
  getCustomerSignList(data, page) {
    const dateRange = FilterService.dateRanageFormat(data.dataRange)
    return this.netService.send({
      server: manageService.personalController.getCustomerSignList,
      data: {
        orderInfo: data.orderInfo,
        timeSearch: data.timeSearch,
        startTime: dateRange.start,
        endTime: dateRange.end,
      },
      page: page
    })
  }

  /**
   * 修改结算通道
   */
  modifySettleChannel({settleChannel, id}) {
    return this.netService.send({
      server: manageService.personalController.modifySettleChannel,
      data: {
        settleChannel: settleChannel,
        id: id
      }
    })
  }

  /**
   * 进件模块-客户资料
   */
  getCustomerDataOrder(data, page) {
    const dateRange = FilterService.dateRanageFormat(data.dataRange)
    return this.netService.send({
      server: manageService.personalController.getCustomerDataOrder,
      data: {
        orderInfo: data.orderInfo, // 请输入客户姓名/证件号码/联系号码/订单所属人查询
        startTime: dateRange.start, // 起始日期
        endTime: dateRange.end, // 终止日期
        timeSearch: data.timeSearch,
      },
      page: page
    })
  }

  /**
   * 上传客户审批资料
   */
  uploadPersonalApproveFile(data) {
    return this.netService.send({
      server: manageService.personalController.uploadPersonalApproveFile,
      data
    })
  }
}
