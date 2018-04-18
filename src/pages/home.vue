<template>
    <section class="page home-page">
        <div class="data-form">
            <div class="col-span">
                <!--左上-->
                <div class="col-span-left">
                    <div class="left-one">
                        <div class="left-one-two"></div>
                        <span class="started-quickly ">快速上手</span>
                        <div class="started-quickly-conent">
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
                <div class="col-left-down">
                    <zmap></zmap>
                </div>
            </div>
            <!--右边待办事项 洒洒水-->
            <div class="schedule">
                <div class="schedule-conent">
                    <div class="schedule-conent-top"></div>
                    <span class="schedule-conent-backlog">待办事项</span>
                    <div class="schedule-conent-circulation" v-for="item in waitToHandle" :key="item.index">
                        <div class="schedule-circulation-item row between-span" >
                            <div class="schedule-item-one">{{$dict.getDictName(item.itemCode)}}</div>
                            <i-button class="schedule-item-button" type="text" @click="pageToOrderQuery">{{item.itemValue}}</i-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Test2 from './test2.vue'
import SvgIcon from '~/components/common/svg-icon.vue'
import Map from '~/components/common/map.vue'
import { DataGrid, DataGridItem } from '@zct1989/vue-component'
import { Layout } from '~/core/decorator'
import { Mutation } from 'vuex-class'
import { Dependencies } from '~/core/decorator'
import { BackLogService } from '~/services/manage-service/back-log.service'

@Layout('workspace')
@Component({
  components: {
    DataGrid,
    DataGridItem,
    SvgIcon,
    zmap: Map
  }
})
export default class Home extends Vue {
  @Dependencies(BackLogService) private backLogService: BackLogService
  private waitToHandle: any = []
  @Mutation openPage

  created() {
    this.backLogService.queryUserBacklog().subscribe(
      val => {
        this.waitToHandle = val
      },
      ({ msg }) => {
        this.$Message.error(msg)
      }
    )
  }
  pageToOrderQuery() {
    this.openPage({
      title: '订单查询',
      path: 'purchase/purchase-query/order-query'
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

<style lang="less" scoped>
.page.home-page {
  .data-form {
    width: 100%;
    background: #eff3f5;
    display: flex;
    justify-content: space-around;
    .col-span {
      .col-span-left {
        width: 100%;
        border: 1px solid #dddddd;
        height: 200px;
        background: #fff;
        .left-one {
          margin-top: 20px;
          margin-left: 20px;
          .left-one-two {
            width: 7px;
            height: 18px;
            background: #265ea2;
            display: inline-block;
          }
          .started-quickly {
            margin-left: 10px;
            font-size: 16px;
            color: #333333;
            position: relative;
            bottom: 3px;
          }
          .started-quickly-conent {
            width: 600px;
            height: 145px;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
        }
      }
      .col-left-down {
        width: 100%;
        border: 1px solid #dddddd;
        height: 630px;
        margin-top: 10px;
        background: #fff;
        padding: 10px;
      }
    }
    .schedule {
      border: 1px solid #dddddd;
      height: 840px;
      background: #fff;
      .schedule-conent {
        margin: 10px;
        .schedule-conent-top {
          width: 7px;
          height: 18px;
          background: #265ea2;
          display: inline-block;
          .schedule-conent-backlog {
            margin-left: 10px;
            font-size: 16px;
            color: #333333;
            position: relative;
            bottom: 3px;
            .schedule-conent-circulation {
              min-width: 200px;
              width: 100%;
              height: 42px;
              margin-top: 10px;
              background: #f5f5f5;
              text-align: center;
              line-height: 12px;
              .schedule-circulation-item {
                padding-top: 6px;
                flex-wrap: nowarp;
                .schedule-item-one {
                  font-size: 12px;
                  color: #666666;
                  line-height: 35px;
                  margin-left: 45px;
                  float: left;
                  .schedule-item-button {
                    color: #265ea2;
                    font-size: 14px;
                    float: right;
                    margin-right: 10px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

.home-page {
  .body {
    border: none;
  }
}

.quickStartContainer {
  text-align: center;
  cursor: pointer;
  .quickStart {
    background: #598ac5;
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
    color: #265ea2;
  }
}

.mapContainer {
  margin: 10px;
  width: 98%;
  height: 98%;
  background-repeat: no-repeat !important;
  background-size: 100% 98%;
  background-image: url('/static/images/common/china.png');
}
</style>
