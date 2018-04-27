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
   *  领取/批量领取案件
   */
  batchReceive(data){
    return this.netService.send({
      server: manageService.assessmentapply.batchReceive,
      data: data,
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
  /**
   * 新增/修改车辆评估基本信息
   */
  saveAssessmentBasicInfo(data){
    return this.netService.send({
      server: manageService.assessmentapply.saveAssessmentBasicInfo,
      data: data
    })
  }
  /**
   * 终止评估
   */
  terminationStatus(data){
    return this.netService.send({
      server: manageService.assessmentapply.terminationStatus,
      data: data
    })
  }
  /**
   * 退件
   */
  backPieceStatus(data){
    return this.netService.send({
      server: manageService.assessmentapply.backPieceStatus,
      data: data
    })
  }
  /**
   * 根据订单编号查询订单基础信息详情
   */
  findBasicInfoByOrderNumber(data){
    return this.netService.send({
      server: manageService.assessmentapply.findBasicInfoByOrderNumber,
      data: data
    })
  }
  /**
   * 删除车辆评估订单
   */
  deleteOrderInfoByOrderId(data){
    return this.netService.send({
      server: manageService.assessmentapply.deleteOrderInfoByOrderId,
      data: data
    })
  }
}
