<!--合同监控-->
<template>
  <section class="page compact-monitor">
    <span class="form-title">合同监控</span>
    <i-input style="display:inline-block;width:12%;margin-left:10px;" placeholder="请输入门店\员工姓名查询"></i-input>
    <span style="margin-left:10px;">姓名：</span>
    <i-input style="display:inline-block;width:10%;" placeholder="请输入姓名"></i-input>
    <span style="margin-left:10px;">下载日期：</span>
    <i-input style="display:inline-block;width:10%;"></i-input>~
    <i-input style="display:inline-block;width:10%;"></i-input>
    <i-button class="blueButton" style="margin-left:20px;">搜索</i-button>
    <data-box :columns="columns1" :data="data1"></data-box>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import RepaySum from "~/components/approval-manage/repay-sum.vue"
  import PurchaseInformation from "~/components/purchase-query/purchase-information.vue"
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    OrderService
  } from "~/services/business-service/order.service";
  import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({
    
    components: {
      DataBox,
      RepaySum,
      PurchaseInformation
    }
  })
  export default class CompactMonitor extends Page {
    @Dependencies(OrderService) private orderService: OrderService;
    private columns1: any;
    private data1: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private repayInfo: Boolean = false;
    private ceshiShow: Boolean = false;


    activated() {}
    created() {
      this.columns1 = [{
          align: "center",
          type: "expand",
          width: "120",
          title: '展开订单',
          render: (h, params) => {
            return h('i-table', {
              props: {
                columns: this.columns2,
                data: this.data2,
                border: true
              }
            })
          }
        }, {
          align: "center",
          type: "index",
          title: '序号',
          width: '60'
        },
        {
          align: "center",
          title: "门店",
          key: "branchAddress",
        },
        {
          align: "center",
          title: "员工姓名",
          key: "employeeName"
        },
        {
          align: "center",
          title: " 下载量",
          key: "downloadNum",
        }
      ];
      this.data1 = [{
        branchAddress: '大雁塔门店',
        employeeName: '李蓓',
        downloadNum: '80'
      }]

      this.columns2 = [{
          title: "操作",
          width: "120",
          align: "center",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("div", [
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.$Modal.info({
                        width: 800,
                        closable: true,
                        render: h => h(PurchaseInformation)
                      })
                    }
                  }
                },
                "查看订单"
              )
            ]);
          }
        },
        {
          align: "center",
          title: "订单创建时间",
          key: 'orderCreateTime'
        },
        {
          align: "center",
          title: "订单编号",
          key: "orderId",
          width: '110'
        },
        {
          align: "center",
          title: "订单类型",
          key: "orderType",
          width: '110'
        },
        {
          align: "center",
          title: " 订单归属公司",
          key: "belongFirm"
        },
        {
          align: "center",
          title: " 产品名称",
          key: "prdName"
        },
        {
          align: "center",
          title: " 审批状态",
          key: "approvalStatus"
        }
      ];

      this.data2 = [{
        orderCreateTime: '2017-12-01 17:34:56',
        orderId: 'KB20171001',
        orderType: '融资租赁',
        belongFirm: '群泰西安',
        approvalStatus: '待审批'
      }]

    }

    repaySum(row) {}
    trailerCar(row) {

    }
    /**
     * 查看凭证
     */
    checkProof(row) {

    }


  }

</script>
<style>


</style>
