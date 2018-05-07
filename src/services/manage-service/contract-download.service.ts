import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class ContractDownloadService {
    @Inject(NetService)
    private netService: NetService
 
    /**
    * 查询合同下载
    */
   getAllContractInfo(data, page) {
        return this.netService.send({
            server: manageService.contractDownloadController.getAllContractInfo,
            data: data,
            page: page
        })
    }

 

}
