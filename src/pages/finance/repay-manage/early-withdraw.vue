<!--客户还款-->
<template>
  <section class="page early-withdraw">
    <span class="form-title">提前收回</span>
    <i-button type="text">昨日</i-button>
    <i-button type="text">今日</i-button>
    <i-button type="text">本周</i-button>
    <i-button type="text">本月</i-button>
    <i-button type="text">上月</i-button>
    <i-button type="text">最近三月</i-button>
    <i-button type="text">本季度</i-button>
    <i-button type="text">本年</i-button>
    <i-button @click="openSearch" style="color:#265EA2">
      <span v-if="!searchOptions">展开</span>
      <span v-if="searchOptions">收起</span>
      <span>高级搜索</span>
    </i-button>
    <i-row v-if="searchOptions" style="margin:6px;position:relative;right:16px;">
      <i-input style="display:inline-block;margin-left:20px;width:16%" placeholder="请录入客户姓名\证件号码"></i-input>
      <i-select style="margin-left:10px;width:10%" placeholder="全部还款状态">
        <i-option value="正常还款客户" key="正常还款客户" label="正常还款客户"></i-option>
        <i-option value="逾期客户" key="逾期客户" label="逾期客户"></i-option>
      </i-select>
      <i-select style="margin-left:10px;width:10%" placeholder="全部结算通道">
        <i-option value="汇付" key="汇付" label="汇付"></i-option>
        <i-option value="富友" key="富友" label="富友"></i-option>
        <i-option value="支付宝" key="支付宝" label="支付宝"></i-option>
        <i-option value="现金" key="现金" label="现金"></i-option>
      </i-select>
      <i-button style="margin-left:10px" class="blueButton">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1"></data-box>

    <!--确认收回-->
    <template>
      <i-modal title="确认收回" width="930" v-model="confirmWithdrawModal" class="confirmWithdraw">
        <confirm-withdraw></confirm-withdraw>
        <div slot="footer">
          <i-button class="highDefaultButton" @click="saveDraft">保存草稿</i-button>
          <i-button class="highButton" @click="confirmWithdrawModal=false">确认</i-button>
        </div>
      </i-modal>
    </template>

    <!--还款详情-->
    <template>
      <i-modal title="还款详情" width="900" :transfer="false" v-model="repayInfoModal">
        <repay-info></repay-info>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import DataBox from "~/components/common/data-box.vue";
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import ConfirmWithdraw from "~/components/finance-manage/confirm-withdraw.vue";
  import DeductRecord from "~/components/finance-manage/deduct-record.vue";
  import RepayInfo from "~/components/finance-manage/repay-info.vue";

  import {
    Tooltip
  } from 'iview'
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({

    components: {
      DataBox,
      ConfirmWithdraw,
      DeductRecord,
      RepayInfo
    }
  })
  export default class EarlyWithdraw extends Page {
    private columns1: any;
    private data1: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private searchOptions: Boolean = false;
    private openColumnsConfig: Boolean = false;
    private confirmWithdrawModal: Boolean = false;
    private repayInfoModal: Boolean = false;

    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    saveDraft() {
      this.$Message.info('保存草稿成功！')
      this.confirmWithdrawModal = false
    }
    created() {
      this.columns1 = [{
          align: "center",
          type: "index",
          width: 60,
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
          title: "操作",
          width: 220,
          align: "center",
          render: (h, {
            row,
            column,
            index
          }) => {
            if (row.customName === '王泽杰') {
              return h('div', [
                h('i-button', {
                  props: {
                    type: 'text'
                  },
                  on: {
                    click: () => {
                      this.confirmWithdrawModal = true
                    }
                  },
                  style: {
                    color: '#265EA2'
                  }
                }, '确认收回'),
                h('i-button', {
                  props: {
                    type: 'text'
                  },
                  on: {
                    click: () => {
                      this.repayInfoModal = true
                    }
                  },
                  style: {
                    color: '#265EA2'
                  }
                }, '还款详情')
              ])
            } else if (row.customName === '陈丽') {
              return h('i-button', {
                props: {
                  type: 'text'
                },
                on: {
                  click: () => {
                    // this.$Modal.info({
                    //   width: '1300',
                    //   title: '还款详情',
                    //   render: h => h(RepayInfo)
                    // })
                    this.repayInfoModal = true
                  }
                },
                style: {
                  color: '#265EA2'
                }
              }, '还款详情')
            }
          }
        },
        {
          title: "订单号",
          key: "orderId",
          align: "center",
          render: (h, row) => {
            return h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {

                }
              }
            }, 'kb20154575')
          }
        },
        {
          align: "center",
          title: "客户结算号",
          key: "customerSettleId",
          render: (h, row) => {
            return h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {

                }
              }
            }, 'LSK3125465')
          }
        },
        {
          align: "center",
          title: "客户姓名",
          key: "customName"
        },
        {
          align: "center",
          title: "证件号",
          key: "idCard"
        },
        {
          align: "center",
          title: "手机号",
          key: "phone"
        },
        {
          align: "center",
          title: "订单创建时间",
          key: "orderCreateTime"
        },
        {
          align: "center",
          title: "合同生效日",
          key: "compactApplyDate"
        },
        {
          align: "center",
          title: "待还本金",
          key: "supposedMajorMoney"
        },
        {
          align: "center",
          title: "待还利息",
          key: "supposedInterest"
        },
        {
          align: "center",
          title: "待还罚息",
          key: "supposedPunishedInterest"
        },
        {
          align: "center",
          title: "利率%/月",
          key: "interestRate"
        },
        {
          align: "center",
          title: "结算通道",
          key: "clearAccountChannel"
        },
        {
          align: "center",
          title: "归属公司",
          key: "belongFirm"
        }
      ];

      this.data1 = [{
          orderId: 'KB56481456',
          customerSettleId: 'LSK3125465',
          customName: '王泽杰',
          idCard: '610303199111414245',
          phone: '18265481548',
          orderCreateTime: '2017-12-03 13:56:03',
          compactApplyDate: '2017-12-03',
          supposedMajorMoney: '800.00',
          supposedInterest: '50.00',
          supposedPunishedInterest: '12.2',
          interestRate: '3.45',
          clearAccountChannel: '支付宝',
          belongFirm: '群泰西安'
        },
        {
          orderId: 'KB56481456',
          customerSettleId: 'LSK3125465',
          customName: '陈丽',
          idCard: '610303199111414245',
          phone: '18265481548',
          orderCreateTime: '2017-12-03 13:56:03',
          compactApplyDate: '2017-12-03',
          supposedMajorMoney: '800.00',
          supposedPunishedInterest: '12.2',
          supposedInterest: '50.00',
          interestRate: '3.45',
          clearAccountChannel: '支付宝',
          belongFirm: '群泰西安'
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
          columnsName: "订单号"
        },
        {
          columnsName: "客户结算号"
        },
        {
          columnsName: "客户姓名"
        },
        {
          columnsName: "证件号"
        },
        {
          columnsName: "手机号"
        },
        {
          columnsName: "订单创建时间"
        },
        {
          columnsName: "合同生效日"
        },
        {
          columnsName: "代还本金"
        },
        {
          columnsName: "代还利息"
        },
        {
          columnsName: "代还罚息"
        },
        {
          columnsName: "利率%/月"
        },
        {
          columnsName: "结算通道"
        },
        {
          columnsName: "归属公司"
        }
      ];
    }
    columnsConfig() {
      this.openColumnsConfig = true;
    }
    /**
     * 确定
     */
    confirm() {}
  }

</script>

<style lang="less">
  .confirmWithdraw {
    .ivu-modal-body {
      height: 600px;
      overflow: auto;
    }
  }

</style>
