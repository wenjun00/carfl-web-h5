// 经销商报价service
import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class CarQuotationService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 查询供应商报价
   */
  getCarQuotationByConditionPage(data, page) {
    return this.netService.send({
      server: manageService.carQuotationController.getCarQuotationByConditionPage,
      data: data,
      page: page
    })
  }
  /**
  * 创建供应商报价
  */
  createCarQuotation(data) {
    return this.netService.send({
      server: manageService.carQuotationController.createCarQuotation,
      data: data
    })
  }
  /**
  * 删除供应商报价
  */
  deleteCarQuotation({ id }) {
    return this.netService.send({
      server: manageService.carQuotationController.deleteCarQuotation,
      data: {
        id: id
      }
    })
  }

  /**
  * 修改供应商报价
  */
  updateCarQuotation(data) {
    return this.netService.send({
      server: manageService.carQuotationController.updateCarQuotation,
      data: data
    })
  }
}
