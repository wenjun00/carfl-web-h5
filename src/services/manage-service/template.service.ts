import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'
export class TemplateService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 查询模板
   */
  selectTemplate(data, page) {
    return this.netService.send({
      server: manageService.templateController.selectTemplate,
      data: data,
      page: page
    })
  }
  /**
   * 生成模板
   */
  createTemplate(data) {
    return this.netService.send({
      server: manageService.templateController.createTemplate,
      data: data
    })
  }
  /**
   * 删除模板
   */
  deleteTemplate(data) {
    return this.netService.send({
      server: manageService.templateController.deleteTemplate,
      data: data
    })
  }
  /**
   * 修改模板
   */
  updateTemplate(data) {
    return this.netService.send({
      server: manageService.templateController.updateTemplate,
      data: data
    })
  }
}
