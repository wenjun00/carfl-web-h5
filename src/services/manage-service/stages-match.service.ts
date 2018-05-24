import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
export class StagesMatchService {

  @Inject()
  private netService: NetService

  /**
   * 分期冲抵顺序配置分页查询
   */
  @Debounce()
  queryStagesMatchPage(type: Number, page) {
    return this.netService.send({
      server: manageService.stagesMatch.queryStagesMatchPage,
      data: { type: type },
      page: page
    })
  }
  /**
   * 修改分期冲抵顺序配置顺序
   */
  @Debounce()
  updateStagesMatch(data: Array<any>) {
    return this.netService.send({
      server: manageService.stagesMatch.updateStagesMatch,
      data: {
        request: data
      },
      loading: true
    })
  }
}
