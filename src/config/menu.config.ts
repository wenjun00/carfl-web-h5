export default [
    {
        title: '进件',
        path: "purchase/purchase-index",
        children: [
            {
                title: '进件管理',
                path: "purchase/purchase-manage",
                color: '#598AC5',
                icon: 'jinjianguanli',
                children: [{
                    title: '融资租赁申请',
                    path: 'purchase/purchase-manage/financing-lease-apply'
                }, {
                    title: '全款销售申请',
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
                }, {
                    title: '评估申请',
                    path: 'purchase/purchase-manage/evaluation-application.tsx'
                }, {
                    title: '评估任务池',
                    path: 'purchase/purchase-manage/evaluation-task-pool'
                }, {
                    title: '押品评估',
                    path: 'purchase/purchase-manage/evaluation-of-collateral'
                }]
            }, {
                title: '进件查询',
                color: '#36B48C',
                path: 'purchase/purchase-query',
                icon: 'jinjianchaxun',
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
                color: '#47AAB6',
                path: 'purchase/finance-account',
                icon: 'caiwujizhang',
                children: [{
                    title: '销售收款申请',
                    path: 'purchase/finance-account/sale-gathering-apply',
                }, {
                    title: '提前结清申请',
                    path: 'purchase/finance-account/early-payment-apply',
                }, {
                    title: '提前收回申请',
                    path: 'purchase/finance-account/early-recover-apply',
                }, {
                    title: '收款记录查询',
                    path: 'purchase/finance-account/receipt-record-query',
                }, {
                    title: '付款记录查询',
                    path: 'purchase/finance-account/payment-record-query',
                }, {
                    title: '付款申请',
                    path: 'purchase/finance-account/pay-apply',
                }]
            },
            {
                title: '审批管理',
                color: '#6D7AD9',
                path: 'purchase/purchase-approve',
                icon: 'shenpiguanli',
                children: [{
                    title: '收款审批',
                    path: 'purchase/purchase-approve/receipt-approve',
                }, {
                    title: '付款审批',
                    path: 'purchase/purchase-approve/payment-approve',
                }]
            }
        ]
    },
    {
        title: '审批',
        path: 'approval/approval-index',
        children: [{
          title: "融资租赁申请",
          path: "purchase/purchase-manage/financing-lease-apply"
        }, {
          title: "全款销售申请",
          path: "purchase/purchase-manage/full-payment-apply"
        }, {
          title: "客户开户",
          path: "purchase/purchase-manage/open-account"
        }, {
          title: "客户签约",
          path: "purchase/purchase-manage/customer-sign"
        }, {
          title: "订单交接",
          path: "purchase/purchase-manage/order-transfer"
        }]
      }, {
        title: "进件查询",
        color: "#36B48C",
        path: "purchase/purchase-query",
        icon: "jinjianchaxun",
        children: [{
          title: "订单查询",
          path: "purchase/purchase-query/order-query",
        }, {
          title: "客户资料查询",
          path: "purchase/purchase-query/customer-data-query",
        }, {
          title: "产品包查询",
          path: "purchase/purchase-query/product-package-query",
        }]
      },
      {
        title: "财务记账",
        color: "#47AAB6",
        path: "purchase/finance-account",
        icon: "caiwujizhang",
        children: [{
          title: "销售收款申请",
          path: "purchase/finance-account/sale-gathering-apply",
        }, {
          title: "提前结清申请",
          path: "purchase/finance-account/early-payment-apply",
        }, {
          title: "提前收回申请",
          path: "purchase/finance-account/early-recover-apply",
        }, {
          title: "收款记录查询",
          path: "purchase/finance-account/receipt-record-query",
        }, {
          title: "付款记录查询",
          path: "purchase/finance-account/payment-record-query",
        }, {
            title: '配置管理',
            icon: 'peizhiguanli',
            color: '#36B48C',
            path: 'base/config-manage',
            children: [{
                title: '产品配置',
                path: 'base/base-data/prod-config'
            }, {
                title: '客户素材维护',
                path: 'base/base-data/customer-fodder-maintain'
            }, {
                title: '经销商报价',
                path: 'base/base-data/dealer-quotes'
            }, {
                title: '导出模版管理',
                path: 'base/base-data/export-template-manage'
            }, {
                title: '冲抵配置',
                path: 'base/base-data/flushing-config'
            }]
        }]
      },
      {
        title: "审批管理",
        color: "#6D7AD9",
        path: "purchase/purchase-approve",
        icon: "shenpiguanli",
        children: [{
          title: "收款审批",
          path: "purchase/purchase-approve/receipt-approve",
        }, {
            title: '运维设置',
            icon: 'yunweishezhi',
            color: '#36B48C',
            path: 'system-manage/operation-config',
            children: [{
                title: '订单状态变更',
                path: 'system-manage/operation-config/order-status-change'
            }, {
                title: '客户还款撤销',
                path: 'system-manage/operation-config/customer-repay-revert'
            }
            ]
        },
        {
            title: '其他设置',
            icon: 'qitashezhi',
            color: '#47AAB6',
            path: 'system-manage/other-config',
            children: [
                {
                    title: '系统参数管理',
                    path: 'system-manage/operation-config/system-param-manage'
                }, {
                    title: '系统备份',
                    path: 'system-manage/operation-config/system-backups'
                }, {
                    title: '批量管理',
                    path: 'system-manage/operation-config/batch-manage'
                }, {
                    title: '系统日志',
                    path: 'system-manage/operation-config/system-log-download'
                }, {
                    title: '123123',
                    path: 'system-manage/operation-config/system-log-download'
                }]
        }]
    },
  {
    title: '库存管理',
    // path: 'system-manage/system-manage-index',
    children: [{
      title: '库存管理',
      color: '#598AC6',
      icon: 'quanxianshezhi',
      path: 'inventory-management/inventory-data',
      children: [{
        title: '押品入库',
        path: 'inventory-management/inventory-data/goods-in-treasury'
      }, {
        title: '押品出库',
        path: 'inventory-management/inventory-data/goods-out-treasury'
      }]
    }]
  },
  {
    title: '客户中心',
    // path: 'system-manage/system-manage-index',
    children: [{
      title: '客户中心',
      color: '#598AC5',
      icon: 'quanxianshezhi',
      path: 'customer-center/customer-data',
      children: [{
        title: '个人意向客户',
        path: 'customer-center/customer-data/personal-client'
      }, {
        title: '个人正式客户',
        path: 'customer-center/customer-data/personal-customer'
      }, {
        title: '个人黑名单',
        path: 'customer-center/customer-data/personal-blacklist'
      }, {
        title: '企业意向客户',
        path: 'customer-center/customer-data/enterprise-intent-customer'
      }, {
        title: '企业正式客户',
        path: 'customer-center/customer-data/enterprise-formal-customer'
      }, {
        title: '企业黑名单',
        path: 'customer-center/customer-data/enterprises-blacklist'
      }]
    }]
  }


]
