import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import {FilterService} from '~/utils/filter.service'
export class AssessMentApplyService {
    @Inject(NetService)
    private netService: NetService
    /**
     * 评估申请订单查询接口
     */
    orderSearch(data,page) {
        return this.netService.send({
            server: manageService.assessmentapply.orderSearch,
            data: data,
            page:page
        })
    }
  /**
   * 评估任务池订单查询
   */
  orderPoolSearch(data,page) {
    return this.netService.send({
      server: manageService.assessmentapply.orderPoolSearch,
      data: data,
      page:page
    })
  }
  /**
   *  更改订单状态
   */
  updateOrderStatus(data){
    return this.netService.send({
      server: manageService.assessmentapply.updateOrderStatus,
      data: data
    })
  }
  /**
   *  评估订单查询
   */
  orderBasicSearch(data,page){
    return this.netService.send({
      server: manageService.assessmentapply.orderBasicSearch,
      data: data,
      page:page
    })
  }
   /**
   *  评估申请 查看详情
   */
  findOrderInfoByOrderNumber(assessmentNo){
    return this.netService.send({
      server: manageService.assessmentapply.findOrderInfoByOrderNumber,
      data: {
          assessmentNo
      },
    })
  }
   /**
   *  评估申请撤回
   */
  withdrawStatus(data){
    return this.netService.send({
      server: manageService.assessmentapply.withdrawStatus,
      data: data,
    })
  }

  /**
   * 根据订单编号处理订单
   */
  beginOrderAssess(data){
    return this.netService.send({
      server: manageService.assessmentapply.beginOrderAssess,
      data: data
    })
  }
}
