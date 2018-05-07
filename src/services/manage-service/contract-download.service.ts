import { NetService } from '~/utils/net.service' 
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'
import { FilterService } from "~/utils/filter.service";

export class ContractDownloadService {
    @Inject(NetService)
    private netService: NetService
 
    /**
    * 查询合同下载
    */
   getAllContractInfo(data, page) {
    const dateRange = FilterService.dateRanageFormat(data.dateRange)
        return this.netService.send({
            server: manageService.contractDownloadController.getAllContractInfo,
            data: {
                userName:data.userName,
                timeSearch: data.timeSearch,
                startTime: dateRange.start,
                endTime: dateRange.end,
            },
            page: page
        })
    }

 

}
