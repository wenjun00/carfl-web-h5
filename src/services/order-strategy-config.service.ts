import { orderStrategyConfigController } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class orderStrategyConfigService {

  @Inject()
  private netService: NetService

  /**
   * 策略分案配置查询
   */
  @Debounce()
  query() {
    return this.netService.send({
      server: orderStrategyConfigController.query
    })
  }
  /**
   * 修改策略配置
   */
  modify(modifyModel) {
    return this.netService.send({
      server: orderStrategyConfigController.modify,
      data: modifyModel
    })
  }
  /**
   * 创建策略分案配置
   */
  createOrderStrategyConfig(createModel) {
    return this.netService.send({
      server: orderStrategyConfigController.createOrderStrategyConfig,
      data: createModel
    })
  }

}

