import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class PersonalMaterialService {
    @Inject(NetService)
    private netService: NetService

    /**
     * 查询所有数据字典类型
     */
    getAllPersonalMaterial(data, page) {
        return this.netService.send({
            server: manageService.personalMaterialController.getAllPersonalMaterial,
            data: data,
            page: page
        })
    }
    /**
     * 新增/修改客户素材
     */
    createOrModifyPersonalMaterial(data) {
        return this.netService.send({
            server: manageService.personalMaterialController.createOrModifyPersonalMaterial,
            data: data
        })
    }

    /**
     * 必传/不必传
     */
    isNecessary() {
        return this.netService.send({
            server: manageService.personalMaterialController.isNecessary,
        })
    }
    /**
     * 勾选客户素材
     */
    select() {
        return this.netService.send({
            server: manageService.personalMaterialController.select,
        })
    }
}