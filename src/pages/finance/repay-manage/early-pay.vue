<!--提前结清-->
<template>
  <section class="page early-pay">
    <span class="form-title">提前结清</span>
    <i-button type="text" @click="getTimeSearch(0)">昨日</i-button>
    <i-button type="text" @click="getTimeSearch(1)">今日</i-button>
    <i-button type="text" @click="getTimeSearch(2)">本周</i-button>
    <i-button type="text" @click="getTimeSearch(3)">本月</i-button>
    <i-button type="text" @click="getTimeSearch(4)">上月</i-button>
    <i-button type="text" @click="getTimeSearch(5)">最近三月</i-button>
    <i-button type="text" @click="getTimeSearch(6)">本季度</i-button>
    <i-button type="text" @click="getTimeSearch(7)">本年</i-button>
    <i-button @click="openSearch" style="color:#265EA2">
      <span v-if="!searchOptions">展开</span>
      <span v-if="searchOptions">收起</span>
      <span>高级搜索</span>
    </i-button>

    <i-row v-if="searchOptions" style="margin:6px;position:relative;right:16px;">
      <i-input style="display:inline-block;margin-left:20px;width:16%" placeholder="请录入客户姓名\证件号码" v-model="customerRepayModel.dynamicParam"></i-input>
      <i-select style="margin-left:10px;width:10%" placeholder="全部还款状态" v-model="customerRepayModel.paymentStatus" clearable>
        <i-option v-for="{value,label} in $dict.getDictData('0104')" :key="value" :label="label" :value="value"></i-option>        
      </i-select>
      <i-select style="margin-left:10px;width:10%" placeholder="全部结算通道" v-model="customerRepayModel.settlementChannel" clearable>
        <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
      </i-select>
      <i-button style="margin-left:10px" class="blueButton" @click="getEarlyPayList">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="customerRepayList"></data-box>

    <template>
      <i-modal v-model="openColumnsConfig" title="列配置" @on-ok="confirm">
        <i-table :columns="columns2" :data="data2"></i-table>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="confirmRepaymentModal" :transfer="false" title="确认结清" width="900">
        <confirm-early-pay ref="confirm-early-pay"></confirm-early-pay>
        <div slot="footer">
          <i-button @click="saveDraft" class="highDefaultButton">保存草稿</i-button>
          <i-button @click="confirmRepayment" class="highButton">确认</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="repayInfoModal" title="还款详情" width="900" :transfer="false">
        <repay-info ref="repay-info"></repay-info>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="deductRecordModal" title="划扣记录" width="1300">
        <deduct-record-has-search ref="deduct-record-has-search"></deduct-record-has-search>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import DataBox from "~/components/common/data-box.vue";
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import ConfirmEarlyPay from "~/components/finance-manage/confirm-early-pay.vue";
  import DeductRecord from "~/components/finance-manage/deduct-record.vue";
  import RepayInfo from "~/components/finance-manage/repay-info.vue";
  import DeductRecordHasSearch from "~/components/finance-manage/deduct-record-has-search.vue";
  import {
    AdvancePayoffService
  } from "~/services/manage-service/advance-payoff.service";
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
      DeductRecordHasSearch,
      DataBox,
      ConfirmEarlyPay,
      DeductRecord,
      RepayInfo
    }
  })
  export default class EarlyPay extends Page {
    @Dependencies(AdvancePayoffService) private advancePayoffService: AdvancePayoffService;
    @Dependencies(PageService) private pageService: PageService;
    
    private customerRepayList: Array < Object > = [];
    private columns1: any;
    private columns2: any = [];
    private data2: Array < Object > = [];
    private searchOptions: Boolean = false;
    private openColumnsConfig: Boolean = false;
    private confirmRepaymentModal: Boolean = false;
    private repayInfoModal: Boolean = false;
    private deductRecordModal: Boolean = false;
    private customerRepayModel: any = {
      settlementChannel: '',
      paymentStatus: '',
      dynamicParam: '',
      timeSearch: ''
    }
    mounted() {
      this.getEarlyPayList();
    }
    /**
     * 保存草稿
     */
    saveDraft() {
      let _repayment: any = this.$refs['confirm-early-pay']
      let data: any = {}
      data.addFinanceUploadResource = _repayment.addFinanceUploadResource
      data.delFinanceUploadResource = _repayment.delFinanceUploadResource
      data.collectMoneyDetails = _repayment.collectMoneyDetails
      data.orderId = _repayment.rowObj.orderId
      data.paymentScheduleId = _repayment.rowObj.orderId
      this.advancePayoffService.saveCollectMoneyHistoryAsDraft(data).subscribe(data => {
        this.$Message.info('保存草稿成功！')
        this.confirmRepaymentModal = false
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    /**
     * 确认还款
     */
    confirmRepayment() {
      let _repayment: any = this.$refs['confirm-early-pay ']
      let data: any = {}
      data.addFinanceUploadResource = _repayment.addFinanceUploadResource
      data.delFinanceUploadResource = _repayment.delFinanceUploadResource
      data.collectMoneyDetails = _repayment.collectMoneyDetails
      data.orderId = _repayment.rowObj.orderId
      data.paymentScheduleId = _repayment.rowObj.orderId
      this.advancePayoffService.saveCollectMoneyHistory(data).subscribe(data => {
        this.$Message.info('操作成功！')
        this.confirmRepaymentModal = false
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
    /**
     * 获取提前结清查询
     */
    getEarlyPayList() {
      this.advancePayoffService.getAdvancePayoffList(this.customerRepayModel, this.pageService).subscribe(data => {
        this.customerRepayList = data
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    created() {
      this.columns1 = [
        {
          title: "操作",
          width: 210,
          align: "center",
          fixed: "left",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'text'
                },
                on: {
                  click: () => {
                    this.confirmRepaymentModal = true
                    let _repayment: any = this.$refs['confirm-early-pay']
                    _repayment.refresh(row)
                  }
                },
                style: {
                  color: '#265EA2'
                }
              }, '确认结清'),
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
              }, '还款详情'),
              h('i-button', {
                props: {
                  type: 'text'
                },
                on: {
                  click: () => {
                    this.deductRecordModal = true
                    let _record: any = this.$refs['deduct-record-has-search']
                    _record.refresh(row)
                  }
                },
                style: {
                  color: '#265EA2'
                }
              }, '划扣记录')
            ])
          }
        },
        {
          align: "center",
          title: "订单号",
          width: 160,
          key: 'orderNumber',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  // this.purchaseInfoModal = true
                }
              }
            }, row.orderNumber)
          }
        },
        {
          align: "center",
          title: "客户结算号",
          key: "clientNumber",
          width: 150,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  // this.customerSettleClick(row)
                }
              }
            }, row.clientNumber)
          }
        },
        {
          align: "center",
          title: "客户姓名",
          key: "name",
          width: 100
        },
        {
          align: "center",
          title: " 证件号",
          key: "idCard",
          width: 160
        },
        {
          align: "center",
          title: " 手机号",
          key: "mobileMain",
          width: 120
        },
        {
          align: "center",
          title: " 订单创建时间",
          key: "createTime",
          width: 160,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.createTime, 'yyyy-MM-dd hh:mm:ss'))
          }
        },
        {
          align: "center",
          title: " 合同生效日",
          key: "contractDate",
          width: 160,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.contractDate, 'yyyy-MM-dd hh:mm:ss'))
          }
        },
        {
          align: "center",
          title: " 待还本金",
          key: "principalReceivable",
          width: 90
        },
        {
          align: "center",
          title: " 待还利息",
          key: "interestReceivable",
          width: 90
        },
        {
          align: "center",
          title: " 待还罚息",
          key: "penaltyReceivable",
          width: 90
        },
        {
          align: "center",
          title: " 利率%/月",
          key: "productRate",
          width: 90
        },
        {
          align: "center",
          title: " 结算通道",
          key: "settlementChannel",
          width: 100,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.settlementChannel));
          }
        },
        {
          align: "center",
          title: " 归属公司",
          width: 100,
          key: "companyChinaName"
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

<style>


</style>
