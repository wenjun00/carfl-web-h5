<!--客户还款查询-->
<template>
  <section class="page customer-repay-query">
    <span class="form-title">客户还款查询</span>
    <i-button type="text" @click="getTimeSearch(0)">昨日</i-button>
    <i-button type="text" @click="getTimeSearch(1)">今日</i-button>
    <i-button type="text" @click="getTimeSearch(2)">本周</i-button>
    <i-button type="text" @click="getTimeSearch(3)">本月</i-button>
    <i-button type="text" @click="getTimeSearch(4)">上月</i-button>
    <i-button type="text" @click="getTimeSearch(5)">最近三月</i-button>
    <i-button type="text" @click="getTimeSearch(6)">本季度</i-button>
    <i-button type="text" @click="getTimeSearch(7)">本年</i-button>
    <i-button @click="openSearch" style="color:#265EA2">
      <span v-if="!searchOptions">展开</span>
      <span v-if="searchOptions">收起</span>
      <span>高级搜索</span>
    </i-button>
    <i-row v-if="searchOptions" style="margin:6px;position;relative;right:10px;">
      <i-input style="display:inline-block;margin-left:20px;width:16%" placeholder="请录入客户姓名\证件号码"></i-input>
      <i-select style="margin-left:10px;width:10%" placeholder="全部还款状态" v-model="customerRepayModel.paymentStatus">
        <i-option value="正常还款客户" key="正常还款客户" label="正常还款客户"></i-option>
        <i-option value="逾期客户" key="逾期客户" label="逾期客户"></i-option>
      </i-select>
      <i-select style="margin-left:10px;width:10%" placeholder="全部结算通道" v-model="customerRepayModel.settlementChannel">
        <i-option value="汇付" key="汇付" label="汇付"></i-option>
        <i-option value="富友" key="富友" label="富友"></i-option>
        <i-option value="支付宝" key="支付宝" label="支付宝"></i-option>
        <i-option value="现金" key="现金" label="现金"></i-option>
      </i-select>
      <i-button class="blueButton" style="margin-left:20px;" @click="getCustomerRepayList">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="customerRepayList"></data-box>
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
    PaymentScheduleService
  } from "~/services/manage-service/paymentSchedule.service";
  import {
    Layout
  } from "~/core/decorator";
  import RepayInfo from '~/components/approval-manage/repay-info.vue'
  import {
    PageService
  } from "~/utils/page.service";
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
    @Dependencies(PaymentScheduleService) private paymentScheduleService: PaymentScheduleService;
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private customerRepayList: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private repayInfoModal: Boolean = false;
    private ceshiShow: Boolean = false;
    private searchOptions: Boolean = false;
    private repaySumModal: Boolean = false;
    private customerSettleModal: Boolean = false;
    private customerRepayModel: any = {
      settlementChannel: '',
      paymentStatus: '',
      dynamicParam: ''
    }
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    created() {
      this.getCustomerRepayList()
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
    }

    repaySum(row) {}
    trailerCar(row) {

    }
    /**
     * 查看凭证
     */
    checkProof(row) {

    }
    getCustomerRepayList() {
      this.paymentScheduleService.getCustomerPayments(this.customerRepayModel, this.pageService).subscribe(val => {
        this.customerRepayList = val.object
      })
    }
    getTimeSearch(val) {

    }
  }

</script>
<style>


</style>
