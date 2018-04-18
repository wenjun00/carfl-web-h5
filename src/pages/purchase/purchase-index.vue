<template>
    <section class="page purchase-index">
        <!--#EFF3F5-->
        <div class="data-form-menu">
            <div class="form-menu-item">
                <span>点击</span>
                <svg-icon class="weiguanzhu" iconClass="weiguanzhu"></svg-icon>
                <span>可加入常用菜单</span>
            </div>
        </div>
        <div v-for="item in purchase" :key="item.index">
            <div class="purchase-container">
                <div class="icon-container" :style="{background:item.color}">
                    <svg-icon :iconClass="item.icon" class="icon-img"></svg-icon>
                </div>
                <div :style="{color:item.color}" class="iconName">{{item.iconName}}</div>
                <div class="vertical-line"></div>
                <div v-for="val in item.pageList" :key="val.pageName" class="item-pagename">
                    <div class="page-list-page-name" @click="redirectToPage(val)">{{val.pageName}}</div>
                    <div class="item-attention" @click="val.isAttention=!val.isAttention">
                        <svg-icon class="icon-yiguanzhu" iconClass="yiguanzhu" style="font-size:16px;color:#F8B551" v-show="val.isAttention"></svg-icon>
                        <svg-icon class="icon-weiguanzhu" iconClass="weiguanzhu" style="font-size:16px;" v-show="!val.isAttention"></svg-icon>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import SvgIcon from '~/components/common/svg-icon.vue'
import { Mutation } from 'vuex-class'
@Component({
  components: {
    SvgIcon
  }
})
export default class PurchaseIndex extends Vue {
  private purchase: Array<Object> = []
  @Mutation('openPage') openPage
  redirectToPage(val) {
    this.openPage({
      resoname: val.pageName,
      path: val.path
    })
  }
  created() {
    this.purchase = [
      {
        index: 1,
        color: '#598AC5',
        iconName: '进件管理',
        icon: 'jinjianguanli',
        pageList: [
          {
            pageName: '融资租赁申请',
            isAttention: true,
            path: 'purchase/purchase-manage/financing-lease-apply'
          },
          {
            pageName: '全额付款申请',
            isAttention: false,
            path: 'purchase/purchase-manage/full-payment-apply'
          },
          {
            pageName: '客户开户',
            isAttention: false,
            path: 'purchase/purchase-manage/open-account'
          },
          {
            pageName: '客户签约',
            isAttention: false,
            path: 'purchase/purchase-manage/customer-sign'
          },
          {
            pageName: '订单交接',
            isAttention: false,
            path: 'purchase/purchase-manage/order-transfer'
          }
        ]
      },
      {
        index: 2,
        color: '#36B48C',
        iconName: '进件查询',
        icon: 'jinjianchaxun',
        pageList: [
          {
            pageName: '订单查询',
            isAttention: false,
            path: 'purchase/purchase-query/order-query'
          },
          {
            pageName: '客户资料查询',
            isAttention: false,
            path: 'purchase/purchase-query/customer-data-query'
          },
          {
            pageName: '产品包查询',
            isAttention: false,
            path: 'purchase/purchase-query/product-package-query'
          }
        ]
      },
      {
        index: 3,
        color: '#47AAB6',
        iconName: '财务记账',
        icon: 'caiwujizhang',
        pageList: [
          {
            pageName: '销售收款申请',
            isAttention: false,
            path: 'purchase/finance-account/sale-gathering-apply'
          },
          {
            pageName: '提前结清申请',
            isAttention: false,
            path: 'purchase/finance-account/early-payment-apply'
          },
          {
            pageName: '提前收回申请',
            isAttention: false,
            path: 'purchase/finance-account/early-recover-apply'
          },
          {
            pageName: '收款记录查询',
            isAttention: false,
            path: 'purchase/finance-account/receipt-record-query'
          },
          {
            pageName: '付款申请',
            isAttention: false,
            path: 'purchase/finance-account/pay-apply'
          },
          {
            pageName: '付款记录查询',
            isAttention: false,
            path:
              'purchase/finance-account/payment-record-querypurchase/finance-account/payment-record-query'
          }
        ]
      },
      {
        index: 4,
        color: '#6D7AD9',
        iconName: '审批管理',
        icon: 'shenpiguanli',
        pageList: [
          {
            pageName: '收款审批',
            isAttention: false,
            path: 'purchase/purchase-approve/receipt-approve'
          },
          {
            pageName: '付款审批',
            isAttention: false,
            path: 'purchase/purchase-approve/payment-approve'
          }
        ]
      }
    ]
  }
}
</script>

<style lang="less" scoped>
.page.purchase-index {
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

.iconName {
  font-size: 18px;
  margin-left: 10px;
}

.purchase-index {
  height: 846px;
}
</style>
