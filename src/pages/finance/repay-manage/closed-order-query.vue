<!--已结清订单查询-->
<template>
  <section class="page closed-order-query">
    <span class="form-title">已结清订单查询</span>
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
    <i-row v-if="searchOptions" style="margin:6px;position:relative;right:16px;">
      <i-input style="display:inline-block;margin-left:20px;width:16%" placeholder="请录入客户姓名\证件号码" v-model="customerRepayModel.dynamicParam"></i-input>
      <i-select style="margin-left:10px;width:10%" placeholder="全部还款状态" v-model="customerRepayModel.paymentStatus" clearable>
        <i-option v-for="{value,label} in $dict.getDictData('0104')" :key="value" :label="label" :value="value"></i-option>        
      </i-select>
      <i-select style="margin-left:10px;width:10%" placeholder="全部结算通道" v-model="customerRepayModel.settlementChannel" clearable>
        <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
      </i-select>
      <i-button style="margin-left:10px" class="blueButton" @click="getEarlyPayList">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1"></data-box>

    <!--还款详情-->
    <template>
      <i-modal v-model="repayInfoModal" :transfer="false" title="还款详情" width="1200">
        <repay-info ref="repay-info"></repay-info>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import DataBox from "~/components/common/data-box.vue";
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import ConfirmRepayment from "~/components/finance-manage/confirm-repayment.vue";
  import DeductRecord from "~/components/finance-manage/deduct-record.vue";
  import RepayInfo from "~/components/finance-manage/repay-info.vue";
  import {
    PayoffProductOrderService
  } from "~/services/manage-service/payoff-product-order.service";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    FilterService
  } from "~/utils/filter.service"
  import {
    Tooltip
  } from 'iview'
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
      ConfirmRepayment,
      DeductRecord,
      RepayInfo
    }
  })
  export default class ClosedOrderQuery extends Page {
    @Dependencies(PayoffProductOrderService) private payoffProductOrderService: PayoffProductOrderService;
    @Dependencies(PageService) private pageService: PageService;

    private columns1: any;
    private data1: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private searchOptions: Boolean = false;
    private openColumnsConfig: Boolean = false;
    private repayInfoModal: Boolean = false;
    private customerRepayModel: any = {
      settlementChannel: '',
      paymentStatus: '',
      dynamicParam: '',
      timeSearch: ''
    }
    mounted() {
      this.getEarlyPayList();
    }
    getEarlyPayList() {
      this.payoffProductOrderService.getPayoffProductOrders(this.customerRepayModel, this.pageService).subscribe(data => {
        this.data1 = data
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    getTimeSearch(val) {
      this.customerRepayModel.settlementChannel = ''
      this.customerRepayModel.paymentStatus = ''
      this.customerRepayModel.dynamicParam = ''
      this.customerRepayModel.timeSearch = val
      this.getEarlyPayList()
      this.customerRepayModel.timeSearch = ''
    }
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }

    created() {
      this.columns1 = [
        {
          title: "操作",
          width: "220",
          align: "center",
          fixed: "left",
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
                  this.repayInfoModal = true
                  let _repay: any = this.$refs['repay-info']
                  _repay.refresh(row)
                }
              },
              style: {
                color: '#265EA2'
              }
            }, '还款详情')
          }
        },
        {
          title: "订单号",
          key: "orderId",
          align: "center",
          render: (h, row) => {
            return h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {

                }
              }
            }, 'kb20154575')
          }
        },
        {
          align: "center",
          title: "客户结算号",
          key: "customerSettleId",
          render: (h, row) => {
            return h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {

                }
              }
            }, 'LSK3125465')
          }
        },
        {
          align: "center",
          title: "客户姓名",
          key: "customName"
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
        },
        {
          align: "center",
          title: "订单创建时间",
          key: "orderCreateTime"
        },
        {
          align: "center",
          title: "合同生效日",
          key: "compactApplyDate"
        },
        {
          align: "center",
          title: "待还本金",
          key: "supposedMajorMoney"
        },
        {
          align: "center",
          title: "待还利息",
          key: "supposedInterest"
        },
        {
          align: "center",
          title: "待还罚息",
          key: "supposedPunishedInterest"
        },
        {
          align: "center",
          title: "利率%/月",
          key: "interestRate"
        },
        {
          align: "center",
          title: "结算通道",
          key: "clearAccountChannel"
        },
        {
          align: "center",
          title: "归属公司",
          key: "belongFirm"
        }
      ];

      this.columns2 = [{
          title: "序号",
          type: "index",
          width: "80",
          align: "center"
        },
        {
          title: "列名",
          key: "columnsName",
          align: "center"
        },
        {
          type: "selection",
          width: "80",
          align: "center"
        }
      ];
      this.data2 = [{
          columnsName: "订单号"
        },
        {
          columnsName: "客户结算号"
        },
        {
          columnsName: "客户姓名"
        },
        {
          columnsName: "证件号"
        },
        {
          columnsName: "手机号"
        },
        {
          columnsName: "订单创建时间"
        },
        {
          columnsName: "合同生效日"
        },
        {
          columnsName: "代还本金"
        },
        {
          columnsName: "代还利息"
        },
        {
          columnsName: "代还罚息"
        },
        {
          columnsName: "利率%/月"
        },
        {
          columnsName: "结算通道"
        },
        {
          columnsName: "归属公司"
        }
      ];
    }
    columnsConfig() {
      this.openColumnsConfig = true;
    }
    /**
     * 确定
     */
    confirm() {}
  }

</script>

<style>


</style>
