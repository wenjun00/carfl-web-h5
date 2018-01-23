import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class CompanyService {
    @Inject(NetService)
    private netService: NetService

    /**
     * 获取所有公司
     */
    getAllCompany(data) {
        return this.netService.send({
            server: manageService.companyController.getAllCompany,
            data: data
        })
    }
    /**
    * 查询分公司信息
    */
    getAllCompanyWithPage(data, page) {
        return this.netService.send({
            server: manageService.companyController.getAllCompanyWithPage,
            data: data,
            page: page
        })
    }
}