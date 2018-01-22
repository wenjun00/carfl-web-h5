<template>
  <section class="home-page theme-default">
    <div style="width:100%;background:#EFF3F5;display:flex;justify-content:space-around">
      <div style="width:76%;">
        <!--左上-->
        <div style="width:100%;border:1px solid #DDDDDD;height:200px;background:#fff">
          <div style="margin-top:20px;margin-left:20px;">
            <div style="width:7px;height:18px;background:#265EA2;display:inline-block"></div>
            <span style="margin-left:10px;font-size:16px;color:#333333;position:relative;bottom:3px;">快速上手</span>
            <div style="width:600px;height:145px;display:flex;justify-content:space-around;align-items:center">
              <div class="quickStartContainer" @click="financeLeaseApply">
                <div class="quickStart">
                  <svg-icon class="svg" iconClass="tianxie"></svg-icon>
                </div>
                <div class="quickText">融资租赁申请</div>
              </div>

              <div class="quickStartContainer" @click="fullPayClick">
                <div class="quickStart">
                  <svg-icon class="svg" iconClass="shenqingbaoming"></svg-icon>
                </div>
                <div class="quickText">全额付款申请</div>
              </div>

              <div class="quickStartContainer" @click="customerAccountClick">
                <div class="quickStart">
                  <svg-icon class="svg" iconClass="tianxie"></svg-icon>
                </div>
                <div class="quickText">客户开户</div>
              </div>

              <div class="quickStartContainer" @click="customerSignClick">
                <div class="quickStart">
                  <svg-icon class="svg" iconClass="tianxie"></svg-icon>
                </div>
                <div class="quickText">客户签约</div>
              </div>
            </div>
          </div>
        </div>
        <!--左下-->
        <div style="width:100%;border:1px solid #DDDDDD;height:630px;margin-top:10px;background:#fff;padding:10px;">
          <zmap></zmap>
        </div>
      </div>
      <!--右边待办事项 洒洒水-->
      <div style="width:23%;border:1px solid #DDDDDD;height:840px;background:#fff;">
        <div style="margin-top:20px;margin-left:20px;">
          <div style="width:7px;height:18px;background:#265EA2;display:inline-block"></div>
          <span style="margin-left:10px;font-size:16px;color:#333333;position:relative;bottom:3px;">待办事项</span>
          <div v-for="item in waitToHandle" :key="item.index" style="width:96%;height:42px;margin-top:10px;background:#F5F5F5;text-align:center;line-height:12px;">
            <div style="padding-top:6px;">
              <div style="font-size:12px;color:#666666;margin-right:118px;display:inline-block">{{item.name}}</div>
              <i-button type="text" style="color:#265EA2;font-size:14px;text-align:right" @click="pageToOrderQuery">{{item.number}}</i-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import Test2 from "./test2.vue";
  import SvgIcon from '~/components/common/svg-icon.vue'
  import Map from "~/components/common/map.vue"
  import {
    DataGrid,
    DataGridItem
  } from "vue-fintech-component";
  import {
    Layout
  } from "~/core/decorator";
  import {
    Mutation
  } from 'vuex-class'

  @Layout("workspace")
  @Component({
    components: {
      DataGrid,
      DataGridItem,
      SvgIcon,
      'zmap': Map
    }
  })
  export default class Home extends Vue {
    private waitToHandle: Array < any >= []
    @Mutation openPage

    created() {
      this.waitToHandle = [{
        index: 1,
        name: '待提交销售申请',
        number: 6
      }, {
        index: 2,
        name: '退回的销售申请',
        number: 8
      }]
    }
    pageToOrderQuery() {
      this.openPage({
        title: '订单查询',
        path: 'purchase/purchase-query/order-query',
      })
    }
    financeLeaseApply() {
      this.openPage({
        title: '融资租赁申请',
        path: 'purchase/purchase-manage/financing-lease-apply'
      })
    }
    fullPayClick() {
      this.openPage({
        title: '全额付款申请',
        path: 'purchase/purchase-manage/full-payment-apply'
      })
    }
    customerAccountClick() {
      this.openPage({
        title: '客户开户',
        path: 'purchase/purchase-manage/open-account'
      })

    }
    customerSignClick() {
      this.openPage({
        title: '客户签约',
        path: 'purchase/purchase-manage/customer-sign'
      })


    }
  }

</script>

<style lang="less">
  .home-page {
    .body {
      border: none;
    }
  }

  .quickStartContainer {
    text-align: center;
    cursor: pointer;
    .quickStart {
      background: #598AC5;
      border-radius: 50%;
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      .svg {
        font-size: 30px;
        color: #fff;
      }
    }

    .quickText {
      margin-top: 6px;
    }
    .quickText:hover {
      color: #265EA2;
    }
  }

  .mapContainer {
    margin: 10px;
    width: 98%;
    height: 98%;
    background-repeat: no-repeat!important;
    background-size: 100% 98%;
    background-image: url('/static/images/common/china.png')
  }

</style>
