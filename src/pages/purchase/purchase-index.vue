<template>
  <section class="purchase-index">
    <!--#EFF3F5-->
    <div style="width:96%;height:60px;background:#F5F5F5;margin-top:10px;border:1px solid #DDDDDD;margin:0 auto">
      <div style="font-size:14px;margin-top: 18px;margin-left: 57px;">
        <span>点击</span>
        <svg-icon iconClass="weiguanzhu" style="font-size:16px;"></svg-icon>
        <span>可加入常用菜单</span>
      </div>
    </div>
    <div v-for="item in purchase" :key="item.index">
      <div class="purchaseContainer">
        <div class="iconContainer" :style="{background:item.color}">
          <svg-icon :iconClass="item.icon" style="color:#fff;font-size:50px;position:relative;left:6px;top:4px"></svg-icon>
        </div>
        <div :style="{color:item.color}" class="iconName">{{item.iconName}}</div>
        <div class="verticalLine"></div>
        <div v-for="val in item.pageList" :key="val.pageName" style="margin-left:100px;">
          <div class="pageList_pageName">{{val.pageName}}</div>
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

  @Component({
    components: {
      SvgIcon
    }
  })
  export default class PurchaseIndex extends Vue {
    private purchase: Array < Object > = []
    created() {
      this.purchase = [{
        index: 1,
        color: '#598AC5',
        iconName: '进件管理',
        icon: 'jinjianguanli',
        pageList: [{
          pageName: '融资租赁申请',
          isAttention: true
        }, {
          pageName: '全额付款申请',
          isAttention: false
        }, {
          pageName: '客户开户',
          isAttention: false
        }, {
          pageName: '客户签约',
          isAttention: false
        }, {
          pageName: '订单交接',
          isAttention: false
        }]
      }, {
        index: 2,
        color: '#36B48C',
        iconName: '进件查询',
        icon: 'jinjianchaxun',
        pageList: [{
          pageName: '订单查询',
          isAttention: false
        }, {
          pageName: '客户资料查询',
          isAttention: false
        }, {
          pageName: '产品包查询',
          isAttention: false
        }]
      }, {
        index: 3,
        color: '#47AAB6',
        iconName: '财务记账',
        icon: 'caiwujizhang',
        pageList: [{
          pageName: '销售收款申请',
          isAttention: false
        }, {
          pageName: '提前结清申请',
          isAttention: false
        }, {
          pageName: '提前收回申请',
          isAttention: false
        }, {
          pageName: '收款记录查询',
          isAttention: false
        }]
      }, {
        index: 4,
        color: '#6D7AD9',
        iconName: '审批管理',
        icon: 'shenpiguanli',
        pageList: [{
          pageName: '收款审批',
          isAttention: false
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

  .purchase-index {
    height: 846px;
  }

</style>
