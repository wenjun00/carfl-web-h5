<template>
  <section class="finance-index">
    <!--#EFF3F5-->
    <div style="width:96%;height:60px;background:#F5F5F5;margin-top:10px;border:1px solid #DDDDDD;margin:0 auto">
      <div style="font-size:14px;margin-top: 18px;margin-left: 57px;">
        <span>点击</span>
        <svg-icon iconClass="weiguanzhu" style="font-size:16px;"></svg-icon>
        <span>可加入常用菜单</span>
      </div>
    </div>
    <div v-for="item in finance" :key="item.index">
      <div class="purchaseContainer">
        <div class="iconContainer" :style="{background:item.color}">
          <svg-icon :iconClass="item.icon" style="color:#fff;font-size:50px;position:relative;left:6px;top:4px"></svg-icon>
        </div>
        <div :style="{color:item.color}" class="iconName">{{item.iconName}}</div>
        <div class="verticalLine"></div>
        <div v-for="val in item.pageList" :key="val.pageName" style="margin-left:100px;">
          <div class="pageList_pageName" @click="redirectToPage(val)">{{val.pageName}}</div>
          <div @click="val.isAttention=!val.isAttention" style="display:inline-block;cursor:pointer">
            <svg-icon iconClass="yiguanzhu" style="font-size:16px;color:#F8B551" v-show="val.isAttention"></svg-icon>
            <svg-icon iconClass="weiguanzhu" style="font-size:16px;" v-show="!val.isAttention"></svg-icon>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import SvgIcon from '~/components/common/svg-icon.vue'
  import {
    Mutation
  } from "vuex-class";
  @Component({
    components: {
      SvgIcon
    }
  })
  export default class FinanceIndex extends Vue {
    private finance: Array < Object > = []
    @Mutation("openPage") openPage;
    redirectToPage(val) {
      this.openPage({
        title: val.pageName,
        path: val.path
      })
    }
    created() {
      this.finance = [{
        index: 1,
        color: '#598AC5',
        iconName: '首付款管理',
        icon: 'shoufukuanguanli',
        pageList: [{
          pageName: '收款',
          isAttention: true,
          path: 'finance/initial-payment-manage/gathering'
        }]
      }, {
        index: 2,
        color: '#36B48C',
        iconName: '还款管理',
        icon: 'huankuanguanli',
        pageList: [{
          pageName: '客户还款',
          isAttention: false,
          path: 'finance/repay-manage/customer-repay'
        }, {
          pageName: '提前结清',
          isAttention: false,
          path: 'finance/repay-manage/early-pay'
        }, {
          pageName: '提前收回',
          isAttention: false,
          path: 'finance/repay-manage/early-withdraw'
        }, {
          pageName: '已结清订单查询',
          isAttention: false,
          path: 'finance/repay-manage/closed-order-query'
        }]
      }, {
        index: 3,
        color: '#47AAB6',
        iconName: '划扣管理',
        icon: 'huakouguanli',
        pageList: [{
          pageName: '个人开户列表',
          isAttention: false,
          path: 'finance/deduct-manage/personal-account-list'
        }, {
          pageName: '企业开户列表',
          isAttention: false,
          path: 'finance/deduct-manage/company-account-list'
        }, {
          pageName: '划扣记录查询',
          isAttention: false,
          path: 'finance/deduct-manage/deduct-record-query'
        }]
      }, {
        index: 4,
        color: '#6D7AD9',
        iconName: '发票管理',
        icon: 'fapiaoguanli',
        pageList: [{
          pageName: '财务开票',
          isAttention: false,
          path: 'finance/invoice-manage/finance-make-invoice'
        }]
      }, {
        index: 5,
        color: '#47AAB6',
        iconName: '财务统计',
        icon: 'fapiaoguanli',
        pageList: [{
          pageName: '清结算日报表',
          isAttention: false,
          path: 'finance/finance-statistics/clear-account-report'
        }, {
          pageName: '月还款报表',
          isAttention: false,
          path: 'finance/finance-statistics/month-repay-report'
        }, {
          pageName: '收款信息导出',
          isAttention: false,
          path: 'finance/finance-statistics/gathering-info-export'
        }, {
          pageName: '订单信息导出',
          isAttention: false,
          path: 'finance/finance-statistics/order-info-export'
        }, {
          pageName: '查询模版管理',
          isAttention: false,
          path: 'finance/finance-statistics/query-template-manage'
        }]
      }]
    }
  }

</script>

<style lang="less">
  .purchaseContainer {
    width: 96%;
    height: 130px;
    background: #fff;
    margin: 30px auto;
    border: 1px solid #dddddd;
    display: flex;
    align-items: center;
  }

  .iconContainer {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-left: 60px;
  }

  .verticalLine {
    width: 1px;
    height: 78px;
    background-color: #DDDDDD;
    position: relative;
    left: 60px;
  }

  .iconName {
    font-size: 18px;
    margin-left: 10px;
  }

  .pageList_pageName {
    font-size: 14px;
    display: inline-block;
  }

  .pageList_pageName:hover {
    font-size: 14px;
    color: #265ea2;
    cursor: pointer;
  }

</style>
