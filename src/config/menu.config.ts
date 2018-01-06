export default [
  {
    title: '进件',
    path: "purchase",
    children: [
      {
        title: '进件管理',
        path: "purchase/purchase-manage",
        children: [{
          title: '融资租赁申请',
          path: 'purchase/purchase-manage/financing-lease-apply'
        }, {
          title: '全额付款申请',
          path: 'purchase/purchase-manage/full-payment-apply'
        }, {
          title: '客户开户',
          path: 'purchase/purchase-manage/open-account'
        }, {
          title: '客户签约',
          path: 'purchase/purchase-manage/customer-sign'
        }, {
          title: '订单交接',
          path: 'purchase/purchase-manage/order-transfer'
        }]
      }, {
        title: '进件查询',
        children: [{
          title: '订单查询',
          path: 'purchase/purchase-query/order-query',
        }, {
          title: '客户资料查询',
          path: 'purchase/purchase-query/customer-data-query',
        }, {
          title: '产品包查询',
          path: 'purchase/purchase-query/product-package-query',
        }]
      },
      {
        title: '财务记账',
        children: [{
          title: '进件收款申请',
          path: '/purchase/finance-account/purchase-receipt-apply',
        }, {
          title: '提前结清申请',
          path: '/purchase/finance-account/early-payment-apply',
        }, {
          title: '提前收回申请',
          path: '/purchase/finance-account/early-recover-apply',
        }, {
          title: '收款记录查询',
          path: '/purchase/finance-account/receipt-record-query',
        }]
      },
      {
        title: '审批管理',
        children: [{
          title: '付款审批',
          path: '/purchase/purchase-approve/payment-approve',
        }, {
          title: '收款审批',
          path: '/purchase/purchase-approve/receipt-approve',
        }]
      }
    ]
  },{
    title:'系统设置',
    path:'systemManage',
    children:[{
      title:'权限设置',
      path:'systemManage/power-config',
      children:[{
        title:'模块功能',
        path:'systemManage/power-config/module-function'
      },{
        title:'角色维护',
        path:'systemManage/power-config/role-maintenance'
      },{
        title:'分配角色',
        path:'systemManage/power-config/allot-role'
      }]
    },{
      title:'运维设置',
      path:'systemManage/operation-config',
      children:[{
        title:'订单状态变更',
        path:'systemManage/operation-config/order-statues-change'
      },{
        title:'系统日志下载',
        path:'systemManage/operation-config/system-log-download'
      },{
        title:'客户还款撤销',
        path:'systemManage/operation-config/customer-repay-revert'
      },{
        title:'组织架构同步',
        path:'systemManage/operation-config/org-frame-syn'
      }]
    }]
  }
]