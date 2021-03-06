import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class DataDictTypeService {
    @Inject(NetService)
    private netService: NetService

    getAllDictType() {
        return this.netService.send({
            server: manageService.dataDictTypeController.getAllDictType,
        })
    }
    createOrModifyDataDictType(data) {
        return this.netService.send({
            server: manageService.dataDictTypeController.createOrModifyDataDictType,
            data
        })
    }
}