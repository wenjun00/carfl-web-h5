import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class DepartmentService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 新增组织机构
   */
  createDepartment() {
    return this.netService.send({
      server: manageService.departmentController.createDepartment
    })
  }
  /**
   * 删除组织机构
   */
  deleteDept({ deptId }) {
    return this.netService.send({
      server: manageService.departmentController.deleteDept,
      data: {
        deptId: deptId
      }
    })
  }
}