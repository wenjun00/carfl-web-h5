<!--月还款报表-->
<template>
  <section class="page month-repay-report">
    <page-header title="月还款报表" hiddenPrint></page-header>
    <data-form hiddenDateSearch hidden-reset>
      <template slot="input">
        <i-form-item label="统计机构：">
          <i-select>
            <i-option label="群泰上海" value="群泰上海" key="群泰上海"></i-option>
            <i-option label="群泰西安" value="群泰西安" key="群泰西安"></i-option>
            <i-option label="群泰武汉" value="群泰武汉" key="群泰武汉"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="统计通道：">
          <i-select>
            <i-option label="汇付" value="汇付" key="汇付"></i-option>
            <i-option label="富友" value="富友" key="富友"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="姓名">
          <i-input placeholder="请输入客户姓名"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="columns1" :data="data1"></data-box>

    <template>
      <i-modal title="还款记录" v-model="monthPersonalDetialModal" :width="900">
        <month-personal-detail></month-personal-detail>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import SvgIcon from '~/components/common/svg-icon.vue'
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    OrderService
  } from "~/services/business-service/order.service";
  import MonthPersonalDetail from '~/components/finance-manage/month-personal-detail.vue'
  import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({

    components: {
      DataBox,
      SvgIcon,
      MonthPersonalDetail
    }
  })
  export default class MonthRepayReport extends Page {
    @Dependencies(OrderService) private orderService: OrderService;
    private columns1: any;
    private data1: Array < Object > = [];
    private searchOptions: Boolean = false;
    private monthPersonalDetialModal: Boolean = false;

    created() {
      this.columns1 = [{
          title: "客户名",
          key: "customerName",
        minWidth: this.$common.getColumnWidth(3),
          fixed: 'left',
          align: 'center',
          render: (h, {
            row,
            columns,
            indexs
          }) => {
            return h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  this.monthReportDetailOpen()
                }
              }
            }, row.customerName)
          }
        }, {
          title: "合同号",
          key: "compactId",
        minWidth: this.$common.getColumnWidth(6),
          align: 'center'
        },
        {
          title: "证件号码",
          key: "idCard",
          minWidth: this.$common.getColumnWidth(6),
          align: 'center'
        },
        {
          title: "手机号码",
          key: "phone",
          minWidth: this.$common.getColumnWidth(5),
          align: 'center'
        },
        {
          title: "银行名称",
          key: "bankName",
          minWidth: this.$common.getColumnWidth(4),
          align: 'center'
        },
        {
          title: "银行卡号",
          key: "bankCardId",
          minWidth: this.$common.getColumnWidth(6),
          align: 'center'
        },
        {
          title: "租赁期数",
          key: "rentPeriods",
          minWidth: this.$common.getColumnWidth(3),
          align: 'center'
        },
        {
          title: "融资额",
          key: "financedAmount",
          align: 'center',
          minWidth: this.$common.getColumnWidth(4),
          render: (h, { row }) => {
            return h(
              "div",
              {
                style: {
                  textAlign: "right"
                }
              },
              this.$filter.toThousands(row.financedAmount)
            );
          }

        },
        {
          title: "首付款",
          key: "initialPayment",
          align: 'center',
          minWidth: this.$common.getColumnWidth(4),
          render: (h, { row }) => {
            return h(
              "div",
              {
                style: {
                  textAlign: "right"
                }
              },
              this.$filter.toThousands(row.initialPayment)
            );
          }

        },
        {
          title: "保证金",
          key: "cashDeposit",
          align: 'center',
          minWidth: this.$common.getColumnWidth(4),
          render: (h, { row }) => {
            return h(
              "div",
              {
                style: {
                  textAlign: "right"
                }
              },
              this.$filter.toThousands(row.cashDeposit)
            );
          }

        },
        {
          title: "购置税",
          key: "purchaseTax",
          minWidth: this.$common.getColumnWidth(4),
          render: (h, { row }) => {
            return h(
              "div",
              {
                style: {
                  textAlign: "right"
                }
              },
              this.$filter.toThousands(row.purchaseTax)
            );
          }

        },
        {
          title: "路桥费",
          key: "tollCharge",
          align: 'center',
          minWidth: this.$common.getColumnWidth(4),
          render: (h, { row }) => {
            return h(
              "div",
              {
                style: {
                  textAlign: "right"
                }
              },
              this.$filter.toThousands(row.tollCharge)
            );
          }

        },
        {
          title: "保险费",
          key: "insuranceExpences",
          align: 'center',
          minWidth: this.$common.getColumnWidth(4),
          render: (h, { row }) => {
            return h(
              "div",
              {
                style: {
                  textAlign: "right"
                }
              },
              this.$filter.toThousands(row.insuranceExpences)
            );
          }

        },
        {
          title: "结算通道",
          key: "settleChannel",
          align: 'center',
          minWidth: this.$common.getColumnWidth(4),
        },
        {
          title: "已还期数",
          key: "alreadyPayPeriods",
          minWidth: this.$common.getColumnWidth(3),
          align: 'center'
        },
        {
          title: "剩余期数",
          key: "residuePeriods",
          minWidth: this.$common.getColumnWidth(3),
          align: 'center'
        },
        {
          title: "月还款额",
          key: "monthPayAmt",
          align: 'center',
          minWidth: this.$common.getColumnWidth(4),
          render: (h, { row }) => {
            return h(
              "div",
              {
                style: {
                  textAlign: "right"
                }
              },
              this.$filter.toThousands(row.monthPayAmt)
            );
          }

        },
        {
          title: "已还款总额",
          key: "alreadyPayAmount",
          align: 'center',
          minWidth: this.$common.getColumnWidth(4),
          render: (h, { row }) => {
            return h(
              "div",
              {
                style: {
                  textAlign: "right"
                }
              },
              this.$filter.toThousands(row.alreadyPayAmount)
            );
          }

        },
        {
          title: "剩余还款总额",
          key: "residuePayAmount",
          align: 'center',
          minWidth: this.$common.getColumnWidth(4),
          render: (h, { row }) => {
            return h(
              "div",
              {
                style: {
                  textAlign: "right"
                }
              },
              this.$filter.toThousands(row.residuePayAmount)
            );
          }

        },
        {
          title: "租金总额",
          key: "rentTotalAmt",
          align: 'center',
          minWidth: this.$common.getColumnWidth(4),
          render: (h, { row }) => {
            return h(
              "div",
              {
                style: {
                  textAlign: "right"
                }
              },
              this.$filter.toThousands(row.rentTotalAmt)
            );
          }

        },
        {
          title: "租赁状态",
          key: "rentStatus",
          minWidth: this.$common.getColumnWidth(4),
          align: 'center'
        }
      ]

      this.data1 = [{
        customerName: '王炳忠',
        compactId: '524565789',
        idCard: '610303199112251546',
        phone: '15064568989',
        bankName: '建设银行',
        bankCardId: '6227004171150138356',
        rentPeriods: '12',
        financedAmount: '50000',
        initialPayment: '10000',
        cashDeposit: '600',
        purchaseTax: '850',
        tollCharge: '352',
        insuranceExpences: '56',
        settleChannel: '汇付',
        alreadyPayPeriods: '11',
        residuePeriods: '1',
        monthPayAmt: '3500',
        alreadyPayAmount: '38500',
        residuePayAmount: '11500',
        rentTotalAmt: '55000',
        rentStatus: '正常',
        test: 'sdf'
      }, {
        customerName: '杨超辉',
        compactId: '524565789',
        idCard: '610303199112251546',
        phone: '15064568989',
        bankName: '建设银行',
        bankCardId: '6227004171150138356',
        rentPeriods: '12',
        financedAmount: '50000',
        initialPayment: '10000',
        cashDeposit: '600',
        purchaseTax: '850',
        tollCharge: '352',
        insuranceExpences: '56',
        settleChannel: '汇付',
        alreadyPayPeriods: '11',
        residuePeriods: '1',
        monthPayAmt: '3500',
        alreadyPayAmount: '38500',
        residuePayAmount: '11500',
        rentTotalAmt: '55000',
        rentStatus: '正常',
        test: 'sdf'
      }]
    }
    getOrderInfoByTime() {}
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    exportMonthReport() {}
    /**
     *  月还款报表个人详情
     */
    monthReportDetailOpen() {
      // this.$Modal.info({
      //   title: '客户月报表详情',
      //   width: 900,
      //   render: h => h(MonthPersonalDetail)
      // })
      this.monthPersonalDetialModal = true
    }
  }

</script>
<style lang="less">
  .page.month-repay-report {
    .data-form {
      margin-top: 10px;
      .title {
        font-size: 18px;
        font-weight: bold
      }
      .form-input {
        margin-left: 10px;
      }
      .form-select {
        margin-left: 10px;
        width: 10%;
      }
      .commend {
        float: right;
        margin-right: 10px;
        margin-top: 10px;
        .commend-item {
          font-size: 16px;
          cursor: pointer;
          display: inline-block;
          margin-left: 10px;
          color: #3367A7;
          .commend-item-one {
            font-size: 12px;
          }
        }
      }
    }
    .search {
      margin: 6px;
      .search-item {
        display: inline-block;
        width: 10%;
      }
    }
  }

</style>
