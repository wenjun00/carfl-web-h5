const OrganizationManage = () => import('~/pages/system-manage/organization-manage.vue')
const RoleManage = () => import('~/pages/system-manage/role-manage.vue')
const UserManage = () => import('~/pages/system-manage/user-manage.vue')

export default [
  {
    path: '/system-manage/organization-manage',
    name: 'organization-manage',
    component: OrganizationManage
  },
  {
    path: '/system-manage/role-manage',
    name: 'role-manage',
    component: RoleManage
  },
  {
    path: '/system-manage/user-manage',
    name: 'user-manage',
    component: UserManage
  }
]
