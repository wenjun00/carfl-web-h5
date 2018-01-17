import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class ManageService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 获取组织
   */
  getAllDepartment() {
    return this.netService.send({
      server: manageService.departmentController.getAllDepartment
    })
  }
  /**
   * 获取分页查询角色
   * @param 
   */
  queryRolePage({ roleName, roleStatus }) {
    return this.netService.send({
      server: manageService.roleController.queryRolePage,
      data: {
        roleName: roleName,
        roleStatus: roleStatus
      }
    })
  }

  /**
   * 分条件查询组织下用户列表
   */
  getUsersByDeptPage({ userName, realName, deptId, status, page, size }) {
    return this.netService.send({
      server: manageService.userController.getUsersByDeptPage,
      data: {
        userName: userName,
        realName: realName,
        deptId: deptId,
        status: status,
        page: page,
        size: size
      }
    })
  }
}