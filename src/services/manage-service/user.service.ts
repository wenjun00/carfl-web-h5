import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class UserService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 获取用户所属角色
   */
  findRolesByUserId({ userId }) {
    return this.netService.send({
      server: manageService.userController.findRolesByUserId,
      data: {
        userId: userId
      }
    })
  }

}
