<!--减免申请记录-->
<template>
  <section class="page derate-apply-record">
    <span class="form-title">减免申请记录</span>
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
    <div style="float:right;margin-top: 10px;margin-right:10px">
      <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
        <svg-icon iconClass="daochu"></svg-icon>
        <span style="font-size: 12px;">导出</span>
      </div>
    </div>
    <i-row v-if="searchOptions" style="margin:6px;position;relative;right:6px;">
      <i-input style="display:inline-block;width:10%;margin-left:10px;" placeholder="请输入客户姓名\证件号码"></i-input>
      <span style="margin-left:10px;">日期：</span>
      <i-date-picker style="display:inline-block;width:10%;"></i-date-picker>~
      <i-date-picker style="display:inline-block;width:10%;"></i-date-picker>
      <i-select style="width:10%;margin-left:10px" placeholder="全部结算通道">
        <i-option label="汇付" value="汇付" key="汇付"></i-option>
        <i-option label="现金" value="现金" key="现金"></i-option>
        <i-option label="支付宝" value="支付宝" key="支付宝"></i-option>
        <i-option label="微信" value="微信" key="微信"></i-option>
        <i-option label="对公转账" value="对公转账" key="对公转账"></i-option>
      </i-select>
      <i-button class="blueButton" style="margin-left:20px;">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1"></data-box>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import RepaySum from "~/components/approval-manage/repay-sum.vue"
  import PurchaseInformation from "~/components/purchase-query/purchase-information.vue";
  import SvgIcon from '~/components/common/svg-icon.vue'
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
      SvgIcon
    }
  })
  export default class DerateApplyRecord extends Page {
    @Dependencies(OrderService) private orderService: OrderService;
    private columns1: any;
    private data1: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private repayInfo: Boolean = false;
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
                      this.$Modal.confirm({
                        title: '提示',
                        content: '确定撤销吗？',
                        onOk: () => {
                          this.$Message.info('撤销成功')
                        }
                      })
                    }
                  }
                },
                "撤销"
              )
            ]);
          }
        },
        {
          align: "center",
          title: "应还罚息",
          key: 'supposedInterest'
        },
        {
          align: "center",
          title: "申请减免罚息",
          key: "applyDerateInterest"
        },
        {
          align: "center",
          title: "剩余罚息",
          key: "restInterest"
        },
        {
          align: "center",
          title: " 减免申请日期",
          key: "derateApplyDate"
        },
        {
          align: "center",
          title: " 客户姓名",
          key: "customerName"
        },
        {
          align: "center",
          title: " 证件号",
          key: "idCard"
        },
        {
          align: "center",
          title: " 手机号",
          key: "phone",
          width: '160'
        },
        {
          align: "center",
          title: " 订单创建时间",
          key: "orderCreateTime",
          width: '120'
        },
        {
          align: "center",
          title: " 订单号",
          width: '160',
          render: (h, params) => {
            return h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  this.$Modal.info({
                    width: '900',
                    render: h => h(PurchaseInformation)
                  })
                }
              }
            }, 'KB2017100102')
          }
        },
        {
          align: "center",
          title: " 合同生效日期",
          key: "compactBeginDate",
          width: '120'
        },
        {
          align: "center",
          title: " 减免备注",
          key: "derateRemark",
          width: '90'
        }
      ];
      this.data1 = [{
        supposedInterest: '1000',
        applyDerateInterest: '500',
        restInterest: '500',
        derateApplyDate: '2017-12-01',
        customerName: '祁吉贵',
        idCard: '610303199111142454',
        phone: '18292536540',
        orderCreateTime: '2017-12-01',
        orderId: 'KB2017100102',
        compactBeginDate: '2017-12-01',
        derateRemark: '同意减免'
      }]

      this.columns2 = [{
          align: "center",
          type: "index",
          width: "60",
          title: '期数'
        },
        {
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
                      this.checkProof(row);
                    }
                  }
                },
                "查看凭证"
              )
            ]);
          }
        },
        {
          align: "center",
          title: "还款状态",
          key: 'payStatus'
        },
        {
          align: "center",
          title: "应付款日",
          key: "supposedPayDate",
          width: '110'
        },
        {
          align: "center",
          title: "实际付款日",
          key: "actualPayDate",
          width: '110'
        },
        {
          align: "center",
          title: " 逾期天数",
          key: "overPeriodsDay"
        },
        {
          align: "center",
          title: " 每日罚息",
          key: "interestEachDay"
        },
        {
          align: "center",
          title: " 金额",
          key: "money"
        },
        {
          align: "center",
          title: " 罚金",
          key: "punishMoney"
        },
        {
          align: "center",
          title: " 开票日",
          key: "invoiceDate",
          width: '110'
        },
        {
          align: "center",
          title: " 应收租金",
          key: "supposedRentMoney"
        },
        {
          align: "center",
          title: " 应收本金",
          key: "supposedPrincipalMoney"
        },
        {
          align: "center",
          title: "应收利息",
          key: "supposedInterest"
        },
        {
          align: "center",
          title: " 应收罚息",
          key: "supposedPunishInterest"
        },
        {
          align: "center",
          title: " 减免罚息",
          key: "derateInterest"
        },
        {
          align: "center",
          title: " 冻结罚息",
          key: "frozenInterest"
        },
        {
          align: "center",
          title: " 实收本金",
          key: "actualPrincipalMoney"
        },
        {
          align: "center",
          title: " 实收利息",
          key: "actualInterest"
        }
      ];

      this.data2 = [{
        payStatus: '结清',
        supposedPayDate: '2017-12-01',
        actualPayDate: '2017-12-01',
        overPeriodsDay: '0',
        interestEachDay: '0',
        money: '1600',
        punishMoney: '0',
        invoiceDate: '2017-12-01',
        supposedRentMoney: '500',
        supposedPrincipalMoney: '950',
        supposedInterest: '150',
        supposedPunishInterest: '0',
        derateInterest: '0',
        frozenInterest: '0',
        actualPrincipalMoney: '1100',
        actualInterest: '150'
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
