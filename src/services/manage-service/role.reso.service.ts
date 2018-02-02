import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'
export class RoleResoService {
    @Inject(NetService)
    private netService: NetService

    /**
     * 重置资源图标
     */
    resetResoIcon() {
        return this.netService.send({
            server: manageService.roleResoController.resetResoIcon,
        })
    }

    /**
     * 重置资源名称
     */
    resetResoName() {
        return this.netService.send({
            server: manageService.roleResoController.resetResoName,
        })
    }
    /**
    * 修改资源图标
    */
    modifyResoIcon(data) {
        return this.netService.send({
            server: manageService.roleResoController.modifyResoIcon,
            data
        })
    }
    /**
     * 修改资源名称
     */
    modifyResoName(data) {
        return this.netService.send({
            server: manageService.roleResoController.modifyResoName,
            data
        })
    }
    /**
     * 查询所有角色资源
     */
    getAllResource() {
        return this.netService.send({
            server: manageService.roleResoController.getAllResource
        })
    }

}
