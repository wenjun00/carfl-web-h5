const CaseImport = () => import('~/pages/case-import/case-import.vue')
const UndistributedCase = () => import('~/pages/case-import/undistributed-case.vue')

export default [
  {
    path: '/case-import/case-import',
    name: 'case-import',
    component: CaseImport
  }, {
    path: '/case-import/undistributed-case',
    name: 'undistributed-case',
    component: UndistributedCase
  }
]
