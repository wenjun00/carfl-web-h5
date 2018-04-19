<!--月还款报表-->
<template>
  <section class="page month-repay-report">
      <page-header title="月还款报表" hiddenPrint></page-header>
    <i-row class="data-form">
      <span class="form-input">统计机构：</span>
      <i-select class="form-select">
        <i-option label="群泰上海" value="群泰上海" key="群泰上海"></i-option>
        <i-option label="群泰西安" value="群泰西安" key="群泰西安"></i-option>
        <i-option label="群泰武汉" value="群泰武汉" key="群泰武汉"></i-option>
      </i-select>
      <span class="form-input">统计通道：</span>
      <i-select class="form-select">
        <i-option label="汇付" value="汇付" key="汇付"></i-option>
        <i-option label="富友" value="富友" key="富友"></i-option>
      </i-select>
      <i-button class="blueButton">搜索</i-button>
    </i-row>
    <i-row v-if="searchOptions" class="search">
      <i-input  placeholder="请输入客户姓名" class="search-item"></i-input>
      <i-button class="blueButton">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1"></data-box>

    <template>
      <i-modal title="还款记录" v-model="monthPersonalDetialModal" width="900">
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
          width: 160,
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
          width: 160,
          align: 'center'
        },
        {
          title: "证件号码",
          key: "idCard",
          width: 160,
          align: 'center'
        },
        {
          title: "手机号码",
          key: "phone",
          width: 160,
          align: 'center'
        },
        {
          title: "银行名称",
          key: "bankName",
          width: 100,
          align: 'center'
        },
        {
          title: "银行卡号",
          key: "bankCardId",
          width: 180,
          align: 'center'
        },
        {
          title: "租赁期数",
          key: "rentPeriods",
          width: 100,
          align: 'center'
        },
        {
          title: "融资额",
          key: "financedAmount",
          width: 100,
          align: 'center'
        },
        {
          title: "首付款",
          key: "initialPayment",
          width: 100,
          align: 'center'
        },
        {
          title: "保证金",
          key: "cashDeposit",
          width: 100,
          align: 'center'
        },
        {
          title: "购置税",
          key: "purchaseTax",
          width: 100
        },
        {
          title: "路桥费",
          key: "tollCharge",
          width: 100,
          align: 'center'
        },
        {
          title: "保险费",
          key: "insuranceExpences",
          width: 100,
          align: 'center'
        },
        {
          title: "结算通道",
          key: "settleChannel",
          width: 100,
          align: 'center'
        },
        {
          title: "已还期数",
          key: "alreadyPayPeriods",
          width: 100,
          align: 'center'
        },
        {
          title: "剩余期数",
          key: "residuePeriods",
          width: 100,
          align: 'center'
        },
        {
          title: "月还款额",
          key: "monthPayAmt",
          width: 100,
          align: 'center'
        },
        {
          title: "已还款总额",
          key: "alreadyPayAmount",
          width: 100,
          align: 'center'
        },
        {
          title: "剩余还款总额",
          key: "residuePayAmount",
          width: 120,
          align: 'center'
        },
        {
          title: "租金总额",
          key: "rentTotalAmt",
          width: 100,
          align: 'center'
        },
        {
          title: "租赁状态",
          key: "rentStatus",
          width: 100,
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
  .page.month-repay-report{
    .data-form{
      margin-top:10px;
      .title{
        font-size:18px;
        font-weight:bold
      }
      .form-input{
        margin-left:10px;
      }
      .form-select{
        margin-left:10px;
        width:10%;
      }
      .commend{
        float:right;
        margin-right:10px;
        margin-top:10px;
        .commend-item{
          font-size:16px;
          cursor:pointer;
          display:inline-block;
          margin-left:10px;
          color:#3367A7;
          .commend-item-one{
            font-size:12px;
          }
        }
      }
    }
    .search{
      margin:6px;
      .search-item{
        display:inline-block;
        width:10%;
      }
    }
  }

</style>

