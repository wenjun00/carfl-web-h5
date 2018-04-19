<template>
  <section class="page approval-index">
    <!--#EFF3F5-->
    <div class="data-form-menu">
      <div class="form-menu-item">
        <span>点击</span>
        <svg-icon class="weiguanzhu" iconClass="weiguanzhu"></svg-icon>
        <span>可加入常用菜单</span>
      </div>
    </div>
    <div v-for="item in approval" :key="item.index">
      <div class="purchase-container">
        <div class="icon-container" :style="{background:item.color}">
          <svg-icon :iconClass="item.icon" class="icon-img"></svg-icon>
        </div>
        <div :style="{color:item.color}" class="iconName">{{item.iconName}}</div>
        <div class="vertical-line"></div>
        <div v-for="val in item.pageList" :key="val.pageName" class="item-pagename">
          <div class="page-list-page-name" @click="redirectToPage(val)">{{val.pageName}}</div>
          <div class="item-attention" @click="val.isAttention=!val.isAttention">
            <svg-icon iconClass="yiguanzhu" class="yiguangzhu"  v-show="val.isAttention"></svg-icon>
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
  export default class ApprovalIndex extends Vue {
    private approval: Array < Object > = []
    @Mutation("openPage") openPage;
    redirectToPage(val) {
      this.openPage({
        title: val.pageName,
        path: val.path
      })
    }
    created() {
      this.approval = [{
        index: 1,
        color: '#598AC5',
        iconName: '审核管理',
        icon: 'shenheguanli',
        pageList: [{
          pageName: '审核资源池',
          isAttention: true,
          path: 'approval/approval-manage/approval-resource-pool'
        }, {
          pageName: '面审',
          isAttention: false,
          path: 'approval/approval-manage/face-approval'
        }, {
          pageName: '复审',
          isAttention: false,
          path: 'approval/approval-manage/second-approval'
        }, {
          pageName: '终审',
          isAttention: false,
          path: 'approval/approval-manage/last-approval'
        }, {
          pageName: '合规检查',
          isAttention: false,
          path: 'approval/approval-manage/meet-condition-check'
        }, {
          pageName: '我的审核',
          isAttention: false,
          path: 'approval/approval-manage/my-approval'
        }, {
          pageName: '流程配置',
          isAttention: false,
          path: 'approval/approval-manage/flow-config'
        }]
      }, {
        index: 2,
        color: '#36B48C',
        iconName: '审核查询',
        icon: 'shenhechaxun',
        pageList: [{
          pageName: '内审管理',
          isAttention: false,
          path: 'approval/approval-manage/internal-audit-manage'
        }, {
          pageName: '灰名单',
          isAttention: false,
          path: 'approval/approval-manage/gray-list'
        }, {
          pageName: '黑名单',
          isAttention: false,
          path: 'approval/approval-manage/black-list'
        }, {
          pageName: '订单查询',
          isAttention: false,
          path: 'approval/approval-manage/approval-order-query'
        }]
      }, {
        index: 3,
        color: '#47AAB6',
        iconName: '还款管理',
        icon: 'huankuanguanli',
        pageList: [{
          pageName: '客户还款查询',
          isAttention: false,
          path: 'approval/repay-manage/customer-repay-query'
        }, {
          pageName: '减免申请记录',
          isAttention: false,
          path: 'approval/repay-manage/derate-apply-record'
        }, {
          pageName: '冻结申请记录',
          isAttention: false,
          path: 'approval/repay-manage/frozen-apply-record'
        }]
      }, {
        index: 4,
        color: '#6D7AD9',
        iconName: '综合查询',
        icon: 'zonghechaxun',
        pageList: [{
          pageName: '审核记录表',
          isAttention: false,
          path: 'approval/synthesize-query/approval-record-table'
        }, {
          pageName: '合同下载监控',
          isAttention: false,
          path: 'approval/synthesize-query/compact-monitor'
        }]
      }]
    }
  }

</script>

<style lang="less">
  .page.approval-index {
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
</style>
