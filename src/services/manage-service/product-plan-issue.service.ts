// 产品计划管理期数service
import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class ProductPlanIssueService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 新增/修改产品计划期数管理
   */
  createOrModifyProductPlan(data) {
    return this.netService.send({
      server: manageService.productPlanIssueController.createOrModifyProductPlan,
      data: data
    })
  }
  /**
   * 
   *  分页查询某一产品下的所有计划
   */
  getAllProductPlan(data, page) {
    return this.netService.send({
      server: manageService.productPlanIssueController.getAllProductPlan,
      data,
      page
    })
  }
  /**
   * 发布
   */
  publish(data) {
    return this.netService.send({
      server: manageService.productPlanIssueController.publish,
      data: data
    })
  }
  /**
   * 停用启用
   */
  ableOrUnable(data) {
    return this.netService.send({
      server: manageService.productPlanIssueController.ableOrUnable,
      data
    })
  }
  /**
   * 查找期数信息
   * @param id 
   */
  findProductPlanById(id) {
    return this.netService.send({
      server: manageService.productPlanIssueController.findProductPlanById,
      data: {
        id
      }
    })
  }
}
