import { RoleService } from "~/services/role.service";
export default {
  namespaced: true,
  state: {
    roleList: [] // 用户角色列表
  },
  mutations: {
    updateRoleList(state, roleArr) {
      state.roleList = roleArr
    }
  },
  actions: {
    getAllRoleData({ state, commit }, callbacks) {
      // roleService.getAllRoles().subscribe(data => {
      //   console.log('role', data)
      // });
    }
  }
}