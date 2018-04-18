<!--清结算日报表-->
<template>
  <section class="page clear-account-report">
    <span class="form-title">清结算日报表</span>
    <i-select class="form-select" placeholder="统计机构"  v-model="model.companyId" clearable>
      <i-option :label="companyChinaname" :value="id" :key="id" v-for="{id, companyChinaname} in company"></i-option>
    </i-select>
    <i-button class="blueButton"  @click="getData">搜索</i-button>
    <i-button @click="openSearch" class="form-button">
      <span v-if="!searchOptions">展开</span>
      <span v-if="searchOptions">收起</span>
      <span>高级搜索</span>
    </i-button>
    <div class="export">
      <div class="export-item">
        <svg-icon iconClass="daochu"></svg-icon>
        <span class="export-item-one">导出</span>
      </div>
    </div>
    <i-row v-if="searchOptions" class="form-second">
      <i-select placeholder="统计通道" class="form-second-one" v-model="model.channel">
        <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
      </i-select>
      <span class="title">结算日期：</span>
      <i-date-picker v-model="model.minSettlementDate"></i-date-picker> ~
      <i-date-picker v-model="model.maxSettlementDate"></i-date-picker>
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
    <i-table :columns="columns1" :data="data1" style="margin-top:10px;margin-right:10px"></i-table>

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
    ReportService
  } from "~/services/report-service/report.service";
  import {
    CompanyService
  } from "~/services/manage-service/company.service";
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
    @Dependencies(ReportService) private reportService: ReportService;
    @Dependencies(CompanyService) private companyService: CompanyService;
    private columns1: any;
    private data1: Array < Object > = [];
    private allData: any = [];
    private company: any = [];
    private model: any = {
      companyId: '',
      channel: '',
      minSettlementDate: '',
      maxSettlementDate: ''
    };
    private columnsFuyou: any;
    private searchOptions: Boolean = false;
    /**
     * 获取列表
     */
    getData() {
      this.reportService.getSettlementReport(this.model).subscribe(data => {
        this.allData = data
        let arr: any = []
        data.forEach(v => {
          if(!arr.find(val => val.companyName === v.companyName)){
            arr.push(v)
          }
        })
        this.data1 = arr
      }, ({ msg }) => {
        this.$Message.error(msg)
      })
    }
    /**
     * 获取公司
     */
    getCompany() {
      this.companyService.getAllCompany().subscribe(val => {
        this.company = val
      })
    }
    created() {
      this.getCompany()
      this.getData()
      this.columns1 = [
        {
          title: "公司简介",
          align: 'center',
          key: 'companyName',
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
                data: [ this.allData.find(v => (v.companyName === params.row.companyName) && (v.type === 162)) || {
                  depositCash: '-',
                  initialPayment: '-',
                  purchaseTax: '-',
                  insuranceExpenses: '-',
                  otherFee: '-',
                  principalReceived: '-',
                  interestReceived: '-',
                  penaltyReceived: '-',
                  param: '-',
                  sum: '-'
                }],
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
                data: [ this.allData.find(v => (v.companyName === params.row.companyName) && (v.type === 163)) || {
                  depositCash: '-',
                  initialPayment: '-',
                  purchaseTax: '-',
                  insuranceExpenses: '-',
                  otherFee: '-',
                  principalReceived: '-',
                  interestReceived: '-',
                  penaltyReceived: '-',
                  param: '-',
                  sum: '-'
                }],
                // border: true,
                stripe: true
              }
            })
          }
        }
      ]


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

<style lang="less">
  .page.clear-account-report{
    .form-select{
      margin-left:10px;
      width:10%;
    }
    .form-button{
      color:#265EA2;
      margin-left:10px;
    }
    .export{
      float:right;
      margin-right:10px;
      margin-top:10px;
      .export-item{
        font-size:16px;
        cursor:pointer;
        display:inline-block;
        margin-left:10px;
        color:#3367A7;
        .export-item-one{
          font-size:12px;
        }
      }
    }
    .form-second{
      margin-top:6px;
      .form-second-one{
        margin-left:10px;
        width:10%;
      }
      .title{
        margin-left:10px;
      }
    }
  }
  .ivu-table-cell {
    padding-left: 0;
    padding-right: 0;
  }

</style>
