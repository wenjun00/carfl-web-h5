<!--客户还款-->
<template>
  <section class="page early-withdraw">
    <span class="form-title">提前收回</span>
    <i-button type="text" @click="getTimeSearch(0)" v-auth="430">昨日</i-button>
    <i-button type="text" @click="getTimeSearch(1)" v-auth="430">今日</i-button>
    <i-button type="text" @click="getTimeSearch(2)" v-auth="430">本周</i-button>
    <i-button type="text" @click="getTimeSearch(3)" v-auth="430">本月</i-button>
    <i-button type="text" @click="getTimeSearch(4)" v-auth="430">上月</i-button>
    <i-button type="text" @click="getTimeSearch(5)" v-auth="430">最近三月</i-button>
    <i-button type="text" @click="getTimeSearch(6)" v-auth="430">本季度</i-button>
    <i-button type="text" @click="getTimeSearch(7)" v-auth="430">本年</i-button>
    <i-button @click="openSearch" style="color:#265EA2" v-auth="429">
      <span v-if="!searchOptions">展开</span>
      <span v-if="searchOptions">收起</span>
      <span>高级搜索</span>
    </i-button>
    <div class="importBtn">
      <div style="cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7" v-auth="431">
        <svg-icon style="font-size:18px;" iconClass="dayin"></svg-icon>
        <span style="font-size:12px;">打印</span>
      </div>
      <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7" v-auth="432">
        <svg-icon iconClass="daochu"></svg-icon>
        <span style="font-size:12px;">导出</span>
      </div>
    </div>
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
      <i-button style="margin-left:10px" class="blueButton" @click="getEarlyPayList">搜索</i-button>
    </i-row>
    <data-box :id="428" :columns="columns1" :data="data1"></data-box>

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
      <i-modal v-model="repayInfoModal" :transfer="false" title="还款详情" width="1200">
        <repay-info ref="repay-info"></repay-info>
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
  import SvgIcon from '~/components/common/svg-icon.vue';
  import {
    AdvanceRevokeService
  } from "~/services/manage-service/advance-revoke.service";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    FilterService
  } from "~/utils/filter.service"
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
      SvgIcon,
      DataBox,
      ConfirmWithdraw,
      DeductRecord,
      RepayInfo
    }
  })
  export default class EarlyWithdraw extends Page {
    @Dependencies(AdvanceRevokeService) private advanceRevokeService: AdvanceRevokeService;
    @Dependencies(PageService) private pageService: PageService;

    private columns1: any;
    private data1: Array < Object > = [];
    private searchOptions: Boolean = false;
    private openColumnsConfig: Boolean = false;
    private confirmWithdrawModal: Boolean = false;
    private repayInfoModal: Boolean = false;
    private customerRepayModel: any = {
      settlementChannel: '',
      paymentStatus: '',
      dynamicParam: '',
      timeSearch: ''
    }
    mounted() {
      this.getEarlyPayList();
    }
    getEarlyPayList() {
      this.advanceRevokeService.getAdvanceRevokeList(this.customerRepayModel, this.pageService).subscribe(data => {
        this.data1 = data
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    getTimeSearch(val) {
      this.customerRepayModel.settlementChannel = ''
      this.customerRepayModel.paymentStatus = ''
      this.customerRepayModel.dynamicParam = ''
      this.customerRepayModel.timeSearch = val
      this.getEarlyPayList()
      this.customerRepayModel.timeSearch = ''
    }
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    saveDraft() {
      this.$Message.info('保存草稿成功！')
      this.confirmWithdrawModal = false
    }
    created() {
      this.columns1 = [
        {
          title: "操作",
          width: 220,
          align: "center",
          fixed: "left",
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
                      let _repay: any = this.$refs['repay-info']
                      _repay.refresh(row)
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
                    this.repayInfoModal = true
                    let _repay: any = this.$refs['repay-info']
                    _repay.refresh(row)
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
          editable: true,
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
          editable: true,          
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
          editable: true,          
          key: "customName"
        },
        {
          align: "center",
          editable: true,          
          title: "证件号",
          key: "idCard"
        },
        {
          align: "center",
          title: "手机号",
          editable: true,          
          key: "phone"
        },
        {
          align: "center",
          title: "订单创建时间",
          editable: true,          
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
.early-withdraw .importBtn {
	float: right;
	margin-right: 13px;
	margin-top: 10px;
}
</style>
