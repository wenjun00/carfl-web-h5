<!--清结算日报表-->
<template>
  <section class="page clear-account-report">
    <span class="form-title">清结算日报表</span>
    <i-select style="margin-left:10px;width:10%;">
      <i-option label="订单信息" value="订单信息" key="订单信息"></i-option>
      <i-option label="车辆信息" value="车辆信息" key="车辆信息"></i-option>
    </i-select>
    <i-button class="blueButton" style="margin-left:10px;">搜索</i-button>
    <data-box :columns="columns1" :data="data1"></data-box>

    <template>
      <i-modal v-model="openColumnsConfig" title="列配置">
        <i-table :columns="columns2" :data="data2"></i-table>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
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
    private columns2: any;
    private data2: Array < Object > = [];
    private columnsHuifu: any;
    private dataHuifu: Array < Object > = [];
    private columnsFuyou: any;
    private dataFuyou: Array < Object > = [];
    private searchOptions: Boolean = false;
    private openColumnsConfig: Boolean = false;

    created() {
      this.columns1 = [{
          width: 60,
          type: 'index',
          align: 'center',
          renderHeader: (h, {
            column,
            index
          }) => {
            return h(
              "div", {
                on: {
                  click: () => {
                    this.columnsConfig();
                  }
                },
                style: {
                  cursor: "pointer"
                }
              }, [
                h("Icon", {
                  props: {
                    type: "gear-b",
                    size: "20"
                  }
                })
              ]
            );
          }
        },
        {
          title: "公司简介",
          align: 'center',
          key: 'companyProfile',
          width: 104
        },
        {
          title: "汇付",
          align: 'center',
          width: 780,
          render: (h, params) => {
            return h('i-table', {
              props: {
                columns: this.columnsHuifu,
                width: 780,
                data: this.dataHuifu,
                // border: true,
                stripe: true
              }
            })
          }
        },
        {
          title: "富友",
          width: 780,
          align: 'center',
          render: (h, params) => {
            return h('i-table', {
              props: {
                columns: this.columnsFuyou,
                width: 780,
                data: this.dataFuyou,
                // border: true,
                stripe: true
              }
            })
          }
        }
      ]
      this.columns2 = [{
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "列名",
          key: "columnsName",
          align: "center"
        },
        {
          type: "selection",
          width: 80,
          align: "center"
        }
      ];
      this.data2 = [{
          columnsName: "开户日期"
        },
        {
          columnsName: "开户类型"
        },
        {
          columnsName: "客户号"
        },
        {
          columnsName: "客户姓名"
        },
        {
          columnsName: "证件号码"
        },
        {
          columnsName: "预留手机"
        }
      ];
      this.data1 = [{
        companyProfile: '群泰西安'
      },{
        companyProfile: '群泰上海'
      },{
        companyProfile: '群泰武汉'
      }]

      this.columnsHuifu = [{
        title: '保证金',
        key: 'cashDeposit',
        width: 80,
        align: 'center'
      }, {
        title: '首付',
        key: 'intialPay',
        align: 'center'
      }, {
        title: '购置税',
        width: 80,
        key: 'payTax',
        align: 'center'
      }, {
        title: '保险',
        key: 'insurance',
        align: 'center'
      }, {
        title: '杂费',
        key: 'otherMoney',
        align: 'center'
      }, {
        title: '月租本金',
        width: 90,
        key: 'monthRentMajorMoney',
        align: 'center'
      }, {
        title: '月租利息',
        width: 90,
        key: 'monthRentInterest',
        align: 'center'
      }, {
        title: '罚息',
        key: 'punishedInterest',
        align: 'center'
      }, {
        title: '手续费',
        key: 'serviceCharge',
        align: 'center'
      }, {
        title: '小计',
        key: 'subtotal',
        align: 'center'
      }]

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
        key: 'cashDeposit',
        align: 'center'
      }, {
        title: '首付',
        key: 'intialPay',
        align: 'center'
      }, {
        title: '购置税',
        key: 'payTax',
        align: 'center'
      }, {
        title: '保险',
        key: 'insurance',
        align: 'center'
      }, {
        title: '杂费',
        key: 'otherMoney',
        align: 'center'
      }, {
        title: '月租本金',
        key: 'monthRentMajorMoney',
        align: 'center'
      }, {
        title: '月租利息',
        key: 'monthRentInterest',
        align: 'center'
      }, {
        title: '罚息',
        key: 'punishedInterest',
        align: 'center'
      }, {
        title: '手续费',
        key: 'serviceCharge',
        align: 'center'
      }, {
        title: '小计',
        key: 'subtotal',
        align: 'center'
      }]

      this.dataFuyou = [{
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
    }
    getOrderInfoByTime() {}
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    exportMonthReport() {
      console.log(12314)
    }
    columnsConfig() {
      this.openColumnsConfig = true;
    }
  }
</script>

<style>
  .ivu-table-cell {
    padding-left: 0;
    padding-right: 0;
  }
</style>