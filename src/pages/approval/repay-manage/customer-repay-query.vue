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
      <i-input style="display:inline-block;margin-left:20px;width:16%" placeholder="请录入客户姓名\证件号码" v-model="customerRepayModel.dynamicParam"></i-input>
      <i-select style="margin-left:10px;width:10%" placeholder="全部还款状态" v-model="customerRepayModel.paymentStatus" clearable>
        <i-option :value="178" :key="178" label="结清"></i-option>
        <i-option :value="179" :key="179" label="逾期"></i-option>
        <i-option :value="180" :key="180" label="待还"></i-option>
        <i-option :value="181" :key="181" label="部分还款"></i-option>
      </i-select>
      <i-select style="margin-left:10px;width:10%" placeholder="全部结算通道" v-model="customerRepayModel.settlementChannel" clearable>
        <i-option :value="162" :key="162" label="汇付"></i-option>
        <i-option :value="163" :key="163" label="富友"></i-option>
        <i-option :value="164" :key="164" label="对公转账"></i-option>
      </i-select>
      <i-button class="blueButton" style="margin-left:20px;" @click="getCustomerRepayList">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="customerRepayList" @onPageChange="getCustomerRepayList" :page="pageService"></data-box>
    <div>
    </div>

    <template>
      <i-modal title="还款详情" :transfer="false" v-model="repayInfoModal" width="1300" class="repay-info">
        <repay-info ref="repay-info"></repay-info>
      </i-modal>
    </template>

    <template>
      <i-modal title="还款总览" :transfer="false" width="1050" v-model="repaySumModal" class="repay-sum">
        <repay-sum ref="repay-sum"></repay-sum>
      </i-modal>
    </template>

    <template>
      <i-modal title="客户当前结算号" :transfer="false" v-model="customerSettleModal">
        <customer-settle-modal ref="customer-settle"></customer-settle-modal>
        <div slot="footer">
          <i-button @click="customerSettleModal=false" class="blueButton">关闭</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal title="订单详情" width="1000" v-model="purchaseInfoModal" class="purchaseInformation">
        <purchase-information></purchase-information>
        <div slot="footer">
          <i-button class="blueButton" @click="purchaseInfoModal=false">返回</i-button>
        </div>
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
  } from "~/services/manage-service/payment-schedule.service";
  import {
    Layout
  } from "~/core/decorator";
  import RepayInfo from '~/components/approval-manage/repay-info.vue'
  import {
    PageService
  } from "~/utils/page.service";
  import {
    FilterService
  } from "~/utils/filter.service"
  import PurchaseInformation from "~/components/purchase-manage/purchase-information.vue";

  @Layout("workspace")
  @Component({

    components: {
      DataBox,
      RepaySum,
      // 客户结算号弹窗
      CustomerSettleModal,
      // 还款详情
      RepayInfo,
      PurchaseInformation
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
    private purchaseInfoModal: Boolean = false;
    private customerRepayModel: any = {
      settlementChannel: '',
      paymentStatus: '',
      dynamicParam: ''
    }
    private personalId: any = '';
    private businessId: any = '';

    mounted() {
      this.getCustomerRepayList()
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
                      this.repaySumClick(row)
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
                      this.repayInfoClick(row)
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
          width: 160,
          key: 'orderNumber',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  this.purchaseInfoModal = true
                }
              }
            }, row.orderNumber)
          }
        },
        {
          align: "center",
          title: "客户结算号",
          key: "clientNumber",
          width: 150,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  this.customerSettleClick(row)
                }
              }
            }, row.clientNumber)
          }
        },
        {
          align: "center",
          title: "客户姓名",
          key: "name",
          width: 100
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
          key: "mobileMain",
          width: 120
        },
        {
          align: "center",
          title: " 订单创建时间",
          key: "createTime",
          width: 160,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.createTime, 'yyyy-MM-dd hh:mm:ss'))
          }
        },
        {
          align: "center",
          title: " 合同生效日",
          key: "contractDate",
          width: 160,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.contractDate, 'yyyy-MM-dd hh:mm:ss'))
          }
        },
        {
          align: "center",
          title: " 待还本金",
          key: "principalReceivable",
          width: 90
        },
        {
          align: "center",
          title: " 待还利息",
          key: "interestReceivable",
          width: 90
        },
        {
          align: "center",
          title: " 待还罚息",
          key: "penaltyReceivable",
          width: 90
        },
        {
          align: "center",
          title: " 利率%/月",
          key: "productRate",
          width: 90
        },
        {
          align: "center",
          title: " 结算通道",
          key: "settlementChannel",
          width: 100,
          render: (h, {
            row,
            column,
            index
          }) => {
            if (row.settlementChannel === 162) {
              return h('span', {}, '汇付')
            } else if (row.settlementChannel === 163) {
              return h('span', {}, '富友')
            } else if (row.settlementChannel === 164) {
              return h('span', {}, '对公转账')
            }
          }
        },
        {
          align: "center",
          title: " 归属公司",
          width: 100,
          key: "companyChinaName"
        }
      ];
    }
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    repaySum(row) {}
    trailerCar(row) {

    }
    /**
     * 查看凭证
     */
    checkProof(row) {

    }
    /**
     * 获取客户还款查询
     */
    getCustomerRepayList() {
      this.paymentScheduleService.getCustomerPayments(this.customerRepayModel, this.pageService).subscribe(data => {
        this.customerRepayList = data
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    getTimeSearch(val) {

    }
    /**
     * 还款详情
     */
    repayInfoClick(row) {
      this.repayInfoModal = true
      let orderId = row.orderId
      let _repayInfo: any = this.$refs['repay-info']
      _repayInfo.getRepayInfo(orderId)
    }
    /**
     * 还款总揽
     */
    repaySumClick(row) {
      this.repaySumModal = true
      let orderId = row.orderId
      let _repaySum: any = this.$refs['repay-sum']
      _repaySum.getRepaySum(orderId)
    }
    customerSettleClick(row) {
      this.customerSettleModal = true
      let _customerSettle: any = this.$refs['customer-settle']
      _customerSettle.getCustomerSettleObj(row)
    }
  }

</script>
<style lang="less">
  .repay-sum,
  .repay-info {
    .ivu-modal-footer {
      display: none;
    }
  }

</style>
