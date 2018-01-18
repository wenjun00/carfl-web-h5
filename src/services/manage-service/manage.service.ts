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
  queryRolePage({ roleName, roleStatus }, page) {
    return this.netService.send({
      server: manageService.roleController.queryRolePage,
      data: {
        roleName: roleName,
        roleStatus: roleStatus
      },
      page: page
    })
  }

  /**
   * 分条件查询组织下用户列表
   */
  getUsersByDeptPage(data, page) {
    return this.netService.send({
      server: manageService.userController.getUsersByDeptPage,
      data: data,
      page: page
    })
  }
  /**
   * 新增用户
   */
  createUser(data) {
    return this.netService.send({
      server: manageService.userController.createUser,
      data: data
    })
  }
  /**
   * 修改用户
   */
  updateUser(data) {
    return this.netService.send({
      server: manageService.userController.updateUser,
      data: data
    })
  }
  /**
   * 修改角色
   */
  updateRole(data) {
    return this.netService.send({
      server: manageService.roleController.updateRole,
      data: data
    })
  }
  /**
   * 新增角色
   */
  createRole(data) {
    return this.netService.send({
      server: manageService.roleController.createRole,
      data: data
    })
  }
  /**
   * 删除角色
   */
  deleteRole({ roleId }) {
    return this.netService.send({
      server: manageService.roleController.deleteRole,
      data: {
        roleId: roleId
      }
    })
  }
  /**
   * 根据角色获取用户列表
   */
  getUserByRoleIdPage(data, page) {
    return this.netService.send({
      server: manageService.roleController.getUserByRoleIdPage,
      data: data,
      page: page
    })
  }
}