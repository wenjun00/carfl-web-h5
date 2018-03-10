<!--清结算日报表-->
<template>
  <section class="page clear-account-report">
    <span class="form-title">清结算日报表</span>
    <i-select style="margin-left:10px;width:10%;" placeholder="统计机构">
      <i-option label="订单信息" value="订单信息" key="订单信息"></i-option>
      <i-option label="车辆信息" value="车辆信息" key="车辆信息"></i-option>
    </i-select>
    <i-button class="blueButton" style="margin-left:10px;">搜索</i-button>
    <i-button @click="openSearch" style="color:#265EA2">
      <span v-if="!searchOptions">展开</span>
      <span v-if="searchOptions">收起</span>
      <span>高级搜索</span>
    </i-button>
    <div style="float:right;margin-right:10px;margin-top:10px;">
      <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
        <svg-icon iconClass="daochu"></svg-icon>
        <span style="font-size: 12px;">导出</span>
      </div>
    </div>
    <i-row v-if="searchOptions" style="margin-top:6px;">
      <i-select placeholder="统计通道" style="margin-left:10px;width:10%;">
        <i-option label="汇付" value="汇付" key="汇付"></i-option>
        <i-option label="富友" value="富友" key="富友"></i-option>
      </i-select>
      <span style="margin-left:10px;">结算日期：</span>
      <i-date-picker></i-date-picker>~
      <i-date-picker></i-date-picker>
    </i-row>
    <!--<table border="1" width="100%" style="margin-top:10px;text-align:center;border:1px solid #DDDEE1">
      <tr height="40">
        <td bgcolor="#F2F2F2" rowspan="2" width="5%">公司简称</td>        
        <td bgcolor="#F2F2F2" colspan="10" width="20%">汇付</td>
        <td bgcolor="#F2F2F2" colspan="10" width="20%">富友</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2" v-for="(v,i) in columnsFuyou" :key="'a'+i">{{v.title}}</td>
        <td bgcolor="#F2F2F2" v-for="(v,i) in columnsFuyou" :key="'b'+i">{{v.title}}</td>
      </tr>
      <tr height="40" v-for="(val,index) in data1" :key="index">
        <td>{{val.companyProfile}}</td>
        <td v-for="(v,i) in columnsFuyou" :key="'c'+i">{{val.huifu[v.key]}}</td>
        <td v-for="(v,i) in columnsFuyou" :key="'d'+i">{{val.fuyou[v.key]}}</td>
      </tr>
    </table>-->
    <i-table :columns="columns1" :data="data1"></i-table>

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
  import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({

    components: {
      DataBox,
      SvgIcon
    }
  })
  export default class ClearAccountReport extends Page {
    @Dependencies(OrderService) private orderService: OrderService;
    private columns1: any;
    private data1: Array < Object > = [];
    private dataHuifu: Array < Object > = [];
    private columnsFuyou: any;
    private dataFuyou: Array < Object > = [];
    private searchOptions: Boolean = false;


    created() {
      this.data1 = [{
        companyProfile: '群泰西安'
      }, {
        companyProfile: '群泰上海'
      }, {
        companyProfile: '群泰武汉'
      }]
      this.columns1 = [
        {
          title: "公司简介",
          align: 'center',
          key: 'companyProfile',
          width: 104
        },
        {
          title: "汇付",
          align: 'center',
          width: 890,
          render: (h, params) => {
            return h('i-table', {
              props: {
                columns: this.columnsFuyou,
                width: 890,
                data: this.dataHuifu,
                // border: true,
                stripe: true
              }
            })
          }
        },
        {
          title: "富友",
          width: 890,
          align: 'center',
          render: (h, params) => {
            return h('i-table', {
              props: {
                columns: this.columnsFuyou,
                width: 890,
                data: this.dataFuyou,
                // border: true,
                stripe: true
              }
            })
          }
        }
      ]

      this.dataHuifu = [{
        cashDeposit: '800',
        intialPay: '900',
        payTax: '56',
        insurance: '34',
        otherMoney: '55',
        monthRentMajorMoney: '345',
        monthRentInterest: '25',
        punishedInterest: '45',
        serviceCharge: '5',
        subtotal: '2856'
      }]

      this.columnsFuyou = [{
        title: '保证金',
        key: 'depositCash',
        align: 'center'
      }, {
        title: '首付',
        key: 'initialPayment',
        align: 'center'
      }, {
        title: '购置税',
        key: 'purchaseTax',
        align: 'center'
      }, {
        title: '保险',
        key: 'insuranceExpenses',
        align: 'center'
      }, {
        title: '杂费',
        key: 'otherFee',
        align: 'center'
      }, {
        title: '月租本金',
        key: 'principalReceived',
        align: 'center'
      }, {
        title: '月租利息',
        key: 'interestReceived',
        align: 'center'
      }, {
        title: '罚息',
        key: 'penaltyReceived',
        align: 'center'
      }, {
        title: '手续费',
        key: 'param',
        align: 'center'
      }, {
        title: '小计',
        key: 'sum',
        align: 'center'
      }]
    }
    getOrderInfoByTime() {}
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    exportMonthReport() {
    }
  }

</script>

<style>
  .ivu-table-cell {
    padding-left: 0;
    padding-right: 0;
  }

</style>
