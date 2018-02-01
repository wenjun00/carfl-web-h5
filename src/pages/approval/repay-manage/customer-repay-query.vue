<!--客户还款查询-->
<template>
  <section class="page customer-repay-query">
    <span class="form-title">客户还款查询</span>
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
    <i-row v-if="searchOptions" style="margin:6px;position;relative;right:10px;">
      <span style="margin-left:20px;">工号：</span>
      <i-input style="display:inline-block;width:10%;" placeholder="请输入工号"></i-input>
      <span style="margin-left:10px;">姓名：</span>
      <i-input style="display:inline-block;width:10%;" placeholder="请输入姓名"></i-input>
      <span style="margin-left:10px;">所属部门：</span>
      <i-input style="display:inline-block;width:10%;" placeholder="请输入所属部门"></i-input>
      <i-button class="blueButton" style="margin-left:20px;">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1"></data-box>
    <div>
    </div>

    <template>
      <i-modal title="还款详情" :transfer="false" v-model="repayInfoModal" width="1300">
        <repay-info></repay-info>
      </i-modal>
    </template>

    <template>
      <i-modal title="还款总揽" :transfer="false" width="900" v-model="repaySumModal">
        <repay-sum></repay-sum>
      </i-modal>
    </template>

    <template>
      <i-modal title="客户当前结算号" :transfer="false" v-model="customerSettleModal">
        <customer-settle-modal></customer-settle-modal>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import RepaySum from "~/components/approval-manage/repay-sum.vue"
  import CustomerSettleModal from "~/components/approval-manage/customer-settle-modal.vue"
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    OrderService
  } from "~/services/business-service/order.service";
  import {
    Layout
  } from "~/core/decorator";
  import RepayInfo from '~/components/approval-manage/repay-info.vue'

  @Layout("workspace")
  @Component({

    components: {
      DataBox,
      RepaySum,
      // 客户结算号弹窗
      CustomerSettleModal,
      // 还款详情
      RepayInfo
    }
  })
  export default class CustomerRepayQuery extends Page {
    @Dependencies(OrderService) private orderService: OrderService;
    private columns1: any;
    private data1: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private repayInfoModal: Boolean = false;
    private ceshiShow: Boolean = false;
    private searchOptions: Boolean = false;
    private repaySumModal: Boolean = false;
    private customerSettleModal: Boolean = false;

    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    created() {
      this.columns1 = [{
          align: "center",
          type: "index",
          width: 60,
          title: '序号'
        },
        {
          title: "操作",
          width: 220,
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
                      // this.$Modal.info({
                      //   title: '还款总览',
                      //   width: '900',
                      //   transfer: false,
                      //   render: h => h(RepaySum)
                      // })
                      this.repaySumModal = true
                    }
                  }
                },
                "还款总览"
              ),
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
                      this.repayInfoModal = true
                    }
                  }
                },
                "还款详情"
              )
            ]);
          }
        },
        {
          align: "center",
          title: "订单编号",
          width: 150,
          key: 'orderId'
        },
        {
          align: "center",
          title: "客户结算号",
          key: "customerSettleId",
          width: 150,
          render: (h, params) => {
            return h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  // this.$Modal.info({
                  //   title: '客户当前结算号',
                  //   render: h => h(CustomerSettleModal),
                  //   okText: '关闭'
                  // })
                  this.customerSettleModal = true
                }
              }
            }, 'LSK13902344')
          }
        },
        {
          align: "center",
          title: "客户姓名",
          key: "customerName"
        },
        {
          align: "center",
          title: " 证件号",
          key: "idCard",
          width: 160
        },
        {
          align: "center",
          title: " 手机号",
          key: "phone",
          width: 120
        },
        {
          align: "center",
          title: " 订单创建时间",
          key: "orderCreateTime",
          width: 160
        },
        {
          align: "center",
          title: " 合同生效日",
          key: "contractDate",
          width: 160
        },
        {
          align: "center",
          title: " 待还本金",
          key: "noPayMajorMoney",
          width: 90
        },
        {
          align: "center",
          title: " 待还利息",
          key: "noPayInterest",
          width: 90
        },
        {
          align: "center",
          title: " 待还罚息",
          key: "noPayPunishInterest",
          width: 90
        },
        {
          align: "center",
          title: " 利率%/月",
          key: "interestRate",
          width: 90
        },
        {
          align: "center",
          title: " 结算通道",
          key: "windAccountChannel"
        },
        {
          align: "center",
          title: " 归属公司",
          key: "belongFirm"
        }
      ];
      this.data1 = [{
        customerSettleId: '622820190001',
        customerName: '韩冰',
        orderId: 'kb20171001',
        idCard: '610525199312061245',
        phone: '18292465893',
        orderCreateTime: '2017-07-07 14:45:36',
        contractDate: '2017-07-08 14:45:36',
        noPayMajorMoney: '1000.00',
        noPayInterest: '120.00',
        noPayPunishInterest: '45.55',
        interestRate: '4.35%',
        windAccountChannel: '汇付',
        belongFirm: '群泰西安'
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
