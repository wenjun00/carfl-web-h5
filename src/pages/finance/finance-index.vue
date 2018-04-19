<template>
  <section class="page finance-index">
    <!--#EFF3F5-->
    <div class="data-form-menu">
      <div class="form-menu-item">
        <span>点击</span>
        <svg-icon iconClass="weiguanzhu"  class="weiguanzhu"></svg-icon>
        <span>可加入常用菜单</span>
      </div>
    </div>
    <div v-for="item in finance" :key="item.index">
      <div class="purchase-container">
        <div class="icon-container" :style="{background:item.color}">
          <svg-icon :iconClass="item.icon" class="icon-img"></svg-icon>
        </div>
        <div :style="{color:item.color}" class="iconName">{{item.iconName}}</div>
        <div class="vertical-line"></div>
        <div v-for="val in item.pageList" :key="val.pageName" class="item-pagename">
          <div class="pageList_pageName" @click="redirectToPage(val)">{{val.pageName}}</div>
          <div @click="val.isAttention=!val.isAttention" class="item-attention">
            <svg-icon iconClass="yiguanzhu" class="yiguangzhu" v-show="val.isAttention"></svg-icon>
            <svg-icon iconClass="weiguanzhu" class="weiguanzhu" v-show="!val.isAttention"></svg-icon>
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
        iconName: '收付款管理',
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
        },
        ]
      }]
    }
  }

</script>

<style lang="less">
  .page.finance-index {
    .data-form-menu {
      width: 96%;
      height: 60px;
      background: #f5f5f5;
      margin-top: 10px;
      border: 1px solid #dddddd;
      margin: 0 auto;
      .form-menu-item {
        font-size: 14px;
        margin-top: 18px;
        margin-left: 57px;
        .weiguanzhu {
          font-size: 16px;
        }
      }
    }
    .purchase-container {
      width: 96%;
      height: 130px;
      background: #fff;
      margin: 30px auto;
      border: 1px solid #dddddd;
      display: flex;
      align-items: center;
      .icon-container {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-left: 60px;
        .icon-img {
          color: #fff;
          font-size: 50px;
          position: relative;
          left: 6px;
          top: 4px;
        }
      }
      .vertical-line {
        width: 1px;
        height: 78px;
        background-color: #dddddd;
        position: relative;
        left: 60px;
      }
      .item-pagename {
        margin-left: 80px;
        .page-list-page-name {
          font-size: 14px;
          display: inline-block;
        }
        .page-list-page-name:hover {
          font-size: 14px;
          color: #265ea2;
          cursor: pointer;
        }
        .item-attention {
          display: inline-block;
          cursor: pointer;
          .icon-yiguanzhu {
            font-size: 16px;
            color: #f8b551;
          }
          .icon-weiguanzhu {
            font-size: 16px;
          }
        }
      }
    }
  }

  .yiguangzhu{
    font-size:16px;color:#F8B551
  }
  .iconName {
    font-size: 18px;
    margin-left: 10px;
  }

  .purchase-index {
    height: 846px;
  }
  .purchase-container {
    width: 96%;
    height: 130px;
    background: #fff;
    margin: 30px auto;
    border: 1px solid #dddddd;
    display: flex;
    align-items: center;
  }

  .icon-container {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-left: 60px;
  }

  .vertical-line {
    width: 1px;
    height: 78px;
    background-color: #DDDDDD;
    position: relative;
    left: 60px;
  }

  .icon-name {
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
