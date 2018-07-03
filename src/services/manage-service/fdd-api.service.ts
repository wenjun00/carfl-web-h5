import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class FddApiService {
    @Inject(NetService)
    private netService: NetService

    /**
     * 
     * 四要素验证
     */
    getInvokeFourElementVerify(data) {
        return this.netService.send({
            server: manageService.fddApiController.getInvokeFourElementVerify,
            data
        })
    }
}