import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'
export class RoleResoService {
    @Inject(NetService)
    private netService: NetService

    /**
     * 查询所有资源角色（模块功能 树结构）
     */
    getAllResource() {
        return this.netService.send({
            server: manageService.roleResoController.getAllResource
        })
    }

}
