import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class PersonalMaterialService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 分页查询客户素材
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
  isNecessary(data) {
    return this.netService.send({
      server: manageService.personalMaterialController.isNecessary,
      data: data
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

  /**
   * 删除客户素材
   */
  deletePersonalMaterial({ id }) {
    return this.netService.send({
      server: manageService.personalMaterialController.deletePersonalMaterial,
      data: {
        id: id
      }
    })
  }
  /**
   * 展示全部客户素材
   */
  getAllPersonalMaterialNoPage({ productId }) {
    return this.netService.send({
      server: manageService.personalMaterialController.getAllPersonalMaterialNoPage,
      data: {
        productId: productId
      }
    })
  }

  /**
  * 新增/修改客户素材类型
  */
  createOrModifyType(data) {
    return this.netService.send({
      server: manageService.personalMaterialController.createOrModifyType,
      data: data
    })
  }
}