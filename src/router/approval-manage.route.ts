const RemainCaseApproval = () => import('~/pages/approval-manage/remain-case-approval.vue')
const ReturnCaseApproval = () => import('~/pages/approval-manage/return-case-approval.vue')
const StorageApproval = () => import('~/pages/approval-manage/storage-approval.vue')

export default [
  {
    path: '/approval-manage/remain-case-approval',
    name: 'remain-case-approval',
    component: RemainCaseApproval
  }, {
    path: '/approval-manage/return-case-approval',
    name: 'return-case-approval',
    component: ReturnCaseApproval
  }, {
    path: '/approval-manage/storage-approval',
    name: 'storage-approval',
    component: StorageApproval
  }
]
