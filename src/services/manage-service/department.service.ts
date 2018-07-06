import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class DepartmentService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 查询所属机构
   */
  getAllDepartment() {
    return this.netService.send({
      server: manageService.departmentController.getAllDepartment,
    })
  }

}