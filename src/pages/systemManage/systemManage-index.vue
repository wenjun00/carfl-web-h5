<template>
  <section class="systemManage-index">
    <!--#EFF3F5-->
    <div style="width:96%;height:60px;background:#F5F5F5;margin-top:10px;border:1px solid #DDDDDD;margin:0 auto">
      <div style="font-size:14px;margin-top: 18px;margin-left: 57px;">
        <span>点击</span>
        <svg-icon iconClass="weiguanzhu" style="font-size:16px;"></svg-icon>
        <span>可加入常用菜单</span>
      </div>
    </div>
    <div v-for="item in system" :key="item.index">
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
  export default class SystemManageIndex extends Vue {
    private system: Array < Object > = []
    @Mutation("openPage") openPage;
    redirectToPage(val) {
      this.openPage({
        title: val.pageName,
        path: val.path
      })
    }
    created() {
      this.system = [{
        index: 1,
        color: '#598AC5',
        iconName: '权限设置',
        icon: 'quanxianshezhi',
        pageList: [{
          pageName: '模块功能',
          isAttention: true,
          path: 'systemManage/power-config/module-function'
        }, {
          pageName: '角色维护',
          isAttention: false,
          path: 'systemManage/power-config/role-maintenance'
        }, {
          pageName: '机构与用户管理',
          isAttention: false,
          path: 'systemManage/power-config/org-user-manage'
        }]
      }, {
        index: 2,
        color: '#36B48C',
        iconName: '运维设置',
        icon: 'yunweishezhi',
        pageList: [{
          pageName: '订单状态变更',
          isAttention: false,
          path: 'systemManage/operation-config/order-status-change'
        }, {
          pageName: '客户还款撤销',
          isAttention: false,
          path: 'systemManage/operation-config/customer-repay-revert'
        }]
      }, {
        index: 3,
        color: '#47AAB6',
        iconName: '其他设置',
        icon: 'qitashezhi',
        pageList: [{
          pageName: '系统参数管理',
          isAttention: false,
          path: 'systemManage/operation-config/system-param-manage'
        }, {
          pageName: '系统备份',
          isAttention: false,
          path: 'systemManage/operation-config/system-backups'
        }, {
          pageName: '批量管理',
          isAttention: false,
          path: 'systemManage/operation-config/batch-manage'
        }, {
          pageName: '系统日志',
          isAttention: false,
          path: 'systemManage/operation-config/system-log-download'
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

  .systemManage-index {
    height: 846px;
  }

</style>
