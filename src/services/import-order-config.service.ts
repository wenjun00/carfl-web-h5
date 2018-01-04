import { importOrderConfigController } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class importOrderConfigService {

  @Inject()
  private netService: NetService

  /**
   * 新增Excel配置模板
   */
  @Debounce()
  createImportConfig(data) {
    return this.netService.send({
      server: importOrderConfigController.createImportConfig,
      data: data
    })
  }
  /**
   * 修改Excel配置模板
   */
  modifyImportConfig(data) {
    return this.netService.send({
      server: importOrderConfigController.modifyImportConfig,
      data: data
    })
  }
  /**
   * 删除Excel配置模板
   */
  deleteImportConfig(id) {
    return this.netService.send({
      server: importOrderConfigController.deleteImportConfig,
      data: {
        id: id
      }
    })
  }
  /**
   * 查询Excel配置模板
   */
  getAllImportConfig(data) {
    return this.netService.send({
      server: importOrderConfigController.getAllImportConfig,
      data: data
    })
  }
  /**
   * 获取所有字段
   */
  getAllAttribute() {
    return this.netService.send({
      server: importOrderConfigController.getAllAttribute
    })
  }
  /**
   * 通过ID获取模板配置集合
   */
  getImportOrderById(id) {
    return this.netService.send({
      server: importOrderConfigController.getImportOrderById,
      data: {
        id: id
      }
    })
  }
}

