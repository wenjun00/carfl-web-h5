const UnreceivedCase = () => import('~/pages/case-manage/unreceived-case.vue')
const ReclaimedCase = () => import('~/pages/case-manage/reclaimed-case.vue')
const InstorageCarManage = () => import('~/pages/case-manage/instorage-car-manage.vue')
const InreviewCarManage = () => import('~/pages/case-manage/inreview-car-manage.vue')
const InpullCarManage = () => import('~/pages/case-manage/inpull-car-manage.vue')

export default [
  {
    path: '/case-manage/unreceived-case',
    name: 'unreceived-case',
    component: UnreceivedCase
  }, {
    path: '/case-manage/reclaimed-case',
    name: 'reclaimed-case',
    component: ReclaimedCase
  }, {
    path: '/case-manage/instorage-car-manage',
    name: 'instorage-car-manage',
    component: InstorageCarManage
  }, {
    path: '/case-manage/inreview-car-manage',
    name: 'inreview-car-manage',
    component: InreviewCarManage
  }, {
    path: '/case-manage/inpull-car-manage',
    name: 'inpull-car-manage',
    component: InpullCarManage
  }
]
