//财务开票 
import { manageService } from '~/config/server/manage-service' 
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import {FilterService} from "~/utils/filter.service";

export class FinanceInvoiceService {
  @Inject(NetService)
  private netService: NetService

  /** 
   * 财务开票列表
   */
  getFinanceInvoiceList(data, page) {
    const dateRange = FilterService.dateRanageFormat(data.dateRange)
    return this.netService.send({
      server: manageService.financeInvoiceController.getFinanceInvoiceList,
      data:{
        startTime: dateRange.start,
        endTime: dateRange.end,
        timeSearch: data.timeSearch,
        dynamicCondition:data.dynamicCondition,
        collectMoneyChannel:data.collectMoneyChannel,
        invoicingStatus:data.invoicingStatus,
        companyId:data.companyId,
        collectItem:data.collectItem,
      },
      page:page
    })
  }
   /**
   * 新增财务开票
   */
  saveFinanceInvoiceRecord(data) {
    let invoicingDate = !!FilterService.dateFormat(data.invoicingDate)?FilterService.dateFormat(data.invoicingDate):null
    return this.netService.send({
      server: manageService.financeInvoiceController.saveFinanceInvoiceRecord,
      data:Object.assign(data, { invoicingDate })
    })
  }
   /**
   * 获取财务附件
   */
  getFinanceUploadResources(data) {
    return this.netService.send({
      server: manageService.financeInvoiceController.getFinanceUploadResources,
      data:data
    })
  }
   /**
   * 获取收款详情
   */
  getCollectMoneyDetail(data) {
    return this.netService.send({
      server: manageService.financeInvoiceController.getCollectMoneyDetail,
      data:data
    })
  }
}


  