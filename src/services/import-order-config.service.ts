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
}

