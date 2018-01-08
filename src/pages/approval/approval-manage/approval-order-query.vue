<!--订单查询-->
<template>
  <section class="page approval-order-query">
    <span class="form-title">订单查询</span>
    <i-button type="text">昨日</i-button>
    <i-button type="text">今日</i-button>
    <i-button type="text">本周</i-button>
    <i-button type="text">本月</i-button>
    <i-button type="text">上月</i-button>
    <i-button type="text">最近三月</i-button>
    <i-button type="text">本季度</i-button>
    <i-button type="text">本年</i-button>
    <i-button @click="openSearch" style="color:#265EA2">
      <span v-if="!searchOptions">展开</span>
      <span v-if="searchOptions">关闭</span>
      <span>高级搜索</span>
    </i-button>
    <i-row v-if="searchOptions" style="margin:6px;">
      <i-input style="display:inline-block;width:18%;margin-left:20px;" placeholder="请录入客户姓名\证件号码\联系号码查询"></i-input>
      <span style="margin-left:10px">日期：</span>
      <i-input style="display:inline-block;width:10%"></i-input>~
      <i-input style="display:inline-block;width:10%"></i-input>
      <i-button style="margin-left:10px" class="blueButton">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1"></data-box>
  </section>
</template>

<script lang="ts">
  import DataBox from "~/components/common/data-box.vue";
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import PurchaseInformation from "~/components/purchase-query/purchase-information.vue";
  import {
    Dependencies
  } from "~/core/decorator";
 import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({
    
    components: {
      DataBox,
      PurchaseInformation
    }
  })
  export default class ApprovalOrderQuery extends Page {
    private columns1: any;
    private data1: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private orderModal: Boolean = false;
    private searchOptions: Boolean = false;

    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    created() {
      this.columns1 = [{
          align: "center",
          type: "index",
          width: "60",
          title: '序号'
        },
        {
          title: "操作",
          width: "100",
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
                        title:'申请单详情',
                        width:'900',
                        render:h=>h(PurchaseInformation)
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
          title: "订单状态",
          align: "center",
          key: "orderStatus"
        },
        {
          align: "center",
          title: "订单创建时间",
          key: "orderCreateTime"
        },
        {
          align: "center",
          title: "进入资源池时间",
          key: "orderPoolTime"
        },
        {
          align: "center",
          title: "省份",
          key: "province"
        },
        {
          align: "center",
          title: "城市",
          key: "city"
        },
        {
          align: "center",
          title: "订单类型",
          key: "orderType"
        },
        {
          align: "center",
          title: "客户姓名",
          key: "customerName"
        },
        {
          align: "center",
          title: "证件号",
          key: "idCard"
        },
        {
          align: "center",
          title: "手机号",
          key: "phone"
        }
      ];

      this.data1 = [{
        orderStatus: '面审通过',
        orderCreateTime: '2017-12-01 13:56:03',
        orderPoolTime: '2017-12-02 11:36:26',
        province: '陕西',
        city: '宝鸡',
        orderType: '直租',
        customerName: '刘佳',
        idCard: '610303199111142564',
        phone: '15094156575'
      }, {
        orderStatus: '面审通过',
        orderCreateTime: '2017-12-01 13:56:03',
        orderPoolTime: '2017-12-02 11:36:26',
        province: '陕西',
        city: '宝鸡',
        orderType: '直租',
        customerName: '刘陇刚',
        idCard: '610303198911041564',
        phone: '13096133575'
      }, {
        orderStatus: '面审通过',
        orderCreateTime: '2017-12-01 13:56:03',
        orderPoolTime: '2017-12-02 11:36:26',
        province: '陕西',
        city: '渭南',
        orderType: '直租',
        customerName: '王泽杰',
        idCard: '610303199111142564',
        phone: '15989756575'
      }, {
        orderStatus: '面审通过',
        orderCreateTime: '2017-12-01 13:56:03',
        orderPoolTime: '2017-12-02 11:36:26',
        province: '陕西',
        city: '咸阳',
        orderType: '直租',
        customerName: '刘佳',
        idCard: '610303199111142564',
        phone: '15168156575'
      }, {
        orderStatus: '待面审',
        orderCreateTime: '2017-12-01 13:56:03',
        orderPoolTime: '2017-12-02 11:36:26',
        province: '陕西',
        city: '西安',
        orderType: '直租',
        customerName: '刘佳',
        idCard: '610303199111142564',
        phone: '18294156575'
      }]

      this.columns2 = [{
        align: 'center',
        title: '操作',
        render: (h, params) => {
          return h('i-button', {
            props: {
              type: 'text'
            },
            style: {
              color: 'blue'
            },
            on: {
              click: () => {
                this.$Modal.info({
                  width: 900,
                  closable: true,
                  render: h => h(PurchaseInformation)
                })
              }
            }
          }, '查看订单')
        }
      }, {
        align: 'center',
        title: '订单创建时间',
        key: 'createTime'
      }, {
        align: 'center',
        key: 'orderId',
        title: '订单编号'
      }, {
        align: 'center',
        key: 'orderType',
        title: '订单类型'
      }, {
        align: 'center',
        key: 'belongFirm',
        title: '订单归属公司'
      }, {
        align: 'center',
        key: 'prdName',
        title: '产品名称'
      }, {
        align: 'center',
        key: 'approvalStatus',
        title: '审批状态'
      }]

      this.data2 = [{
        createTime: '2017-12-06 18:45:36',
        orderId: 'lsx0909120',
        orderType: '直租',
        belongFirm: '指旺金科',
        prdName: '王炸',
        approvalStatus: '待面审'
      }, {
        createTime: '2017-12-06 18:45:36',
        orderId: 'lsx0909120',
        orderType: '直租',
        belongFirm: '指旺金科',
        prdName: '王炸',
        approvalStatus: '待面审'
      }, {
        createTime: '2017-12-06 18:45:36',
        orderId: 'lsx0909120',
        orderType: '直租',
        belongFirm: '指旺金科',
        prdName: '王炸',
        approvalStatus: '待面审'
      }]
    }
    /**
     * 领取
     */
    getOrder(row) {
      this.orderModal = true
    }

    queryOrder() {
      this.$Modal.info()
    }
  }
</script>

<style>

</style>