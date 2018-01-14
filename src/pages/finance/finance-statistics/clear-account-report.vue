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
      <span v-if="searchOptions">关闭</span>
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
          width: 890,
          render: (h, params) => {
            return h('i-table', {
              props: {
                columns: this.columnsHuifu,
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
          columnsName: "保证金"
        },
        {
          columnsName: "首付"
        },
        {
          columnsName: "购置税"
        },
        {
          columnsName: "保险"
        },
        {
          columnsName: "杂费"
        },
        {
          columnsName: "月租本金"
        },
        {
          columnsName: "月租利息"
        },
        {
          columnsName: "罚息"
        },
        {
          columnsName: "手续费"
        }
      ];
      this.data1 = [{
        companyProfile: '群泰西安'
      }, {
        companyProfile: '群泰上海'
      }, {
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
