import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from "~/utils/filter.service";
export class AssessMentPlacingService {
  @Inject(NetService)
  private netService: NetService
  /**
   * 押品入库查询
   */
  orderWarehousingSerach(data, page) {
    return this.netService.send({
      server: manageService.assessmentplacing.orderWarehousingSerach,
      data: data,
      page: page
    })
  }
  /**
   * 押品出库查询
   */
  orderPlacingSerach(data, page) {
    return this.netService.send({
      server: manageService.assessmentplacing.orderPlacingSerach,
      data: data,
      page: page
    })
  }
  /**
   * 入库详情查看
   */
  findWarehousingInfoByWarehousingId(data) {
    return this.netService.send({
      server: manageService.assessmentplacing.findWarehousingInfoByWarehousingId,
      data: data,
    })
  }
  /**
   * 入库点击确定
   */
  createWarehousingOrder(data) {
    data.warehousingDate = FilterService.dateFormat(data.warehousingDate)

    delete data.modelofcar
    delete data.carColor
    delete data.city
    delete data.carNoShow
    delete data.frameNo
    delete data.engineNo
    delete data.carSource
    delete data.placingTypeId
    delete data.fee
    delete data.cardsDate

    return this.netService.send({
      server: manageService.assessmentplacing.createWarehousingOrder,
      data: data,
    })
  }
  /**
  * 入库点击确定
  */
  findAllAssessmentPlacingType() {
    return this.netService.send({
      server: manageService.assessmentplacing.findAllAssessmentPlacingType,
    })
  }
  /**
   * 根据ID查询出库详情
   */
  findPlacingByPlacingId(data) {
    return this.netService.send({
      server: manageService.assessmentplacing.findPlacingByPlacingId,
      data: data,
    })
  }
  /**
   * 押品出库
   */
  createPlacingOrder(data) {
    data.placingDate = FilterService.dateFormat(data.placingDate)
    delete data.cardsDate
    return this.netService.send({
      server: manageService.assessmentplacing.createPlacingOrder,
      data: data,
    })
  }










}
