<!--客户还款-->
<template>
  <section class="page customer-repay">
    <span class="form-title">客户还款</span>
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
      <i-select style="margin-left:10px;width:10%" placeholder="全部还款状态">
        <i-option v-for="{value,label} in $dict.getDictData('0104')" :key="value" :label="label" :value="value"></i-option>        
      </i-select>
      <i-select style="margin-left:10px;width:10%" placeholder="全部结算通道" clearable>
        <i-option v-for="{value,label} in $dict.getDictData('0105')" :key="value" :label="label" :value="value"></i-option>
      </i-select>
      <i-button style="margin-left:10px" class="blueButton" @click="getCustomerRepayList">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="customerRepayList" @onPageChange="getCustomerRepayList" :page="pageService"></data-box>

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
      <i-modal v-model="confirmRepaymentModal" :transfer="false" title="确认还款" width="900">
        <confirm-repayment ref="confirm-repayment"></confirm-repayment>
        <div slot="footer">
          <i-button @click="saveDraft" class="highDefaultButton">保存草稿</i-button>
          <i-button @click="confirmRepayment" class="highButton">确认</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="repayInfoModal" :transfer="false" title="还款详情" width="1200">
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
  import ConfirmRepayment from "~/components/finance-manage/confirm-repayment.vue";
  import DeductRecordHasSearch from "~/components/finance-manage/deduct-record-has-search.vue";
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
  import {
    PaymentScheduleService
  } from "~/services/manage-service/payment-schedule.service";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    FilterService
  } from "~/utils/filter.service"
  @Layout("workspace")
  @Component({

    components: {
      DataBox,
      ConfirmRepayment,
      DeductRecordHasSearch,
      RepayInfo
    }
  })
  export default class CustomerRepay extends Page {
    @Dependencies(PaymentScheduleService) private paymentScheduleService: PaymentScheduleService;
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private customerRepayList: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private searchOptions: Boolean = false;
    private openColumnsConfig: Boolean = false;
    private confirmRepaymentModal: Boolean = false;
    private repayInfoModal: Boolean = false;
    private deductRecordModal: Boolean = false;
    private customerRepayModel: any = {
      settlementChannel: '',
      paymentStatus: '',
      dynamicParam: ''
    }
    mounted() {
      this.getCustomerRepayList();
    }
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    getTimeSearch(val) {

    }
    /**
     * 保存草稿
     */
    saveDraft() {
      let _repayment: any = this.$refs['confirm-repayment']
      let data: any = {}
      data.addFinanceUploadResource = _repayment.addFinanceUploadResource
      data.delFinanceUploadResource = _repayment.delFinanceUploadResource
      data.collectMoneyDetails = _repayment.collectMoneyDetails
      data.orderId = _repayment.rowObj.orderId
      data.paymentScheduleId = _repayment.rowObj.orderId
      this.paymentScheduleService.saveCustomerPaymentInfoAsDraft(data).subscribe(data => {
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
      let _repayment: any = this.$refs['confirm-repayment']
      let data: any = {}
      data.addFinanceUploadResource = _repayment.addFinanceUploadResource
      data.delFinanceUploadResource = _repayment.delFinanceUploadResource
      data.collectMoneyDetails = _repayment.collectMoneyDetails
      data.orderId = _repayment.rowObj.orderId
      data.paymentScheduleId = _repayment.rowObj.orderId
      this.paymentScheduleService.saveCustomerPaymentInfo(data).subscribe(data => {
        this.$Message.info('还款成功！')
        this.confirmRepaymentModal = false
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
            let arr = (row.orderStatus === 316 || row.orderStatus === 319)?[h('i-button', {
                props: {
                  type: 'text'
                },
                on: {
                  click: () => {
                    this.confirmRepaymentModal = true
                    let _repayment: any = this.$refs['confirm-repayment']
                    _repayment.refresh(row)
                  }
                },
                style: {
                  color: '#265EA2'
                }
              }, '确认还款')] :
              [h('i-button', {
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
              }, '划扣记录')]
              arr.push(h('i-button', {
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
              }, '还款详情'))
            return h('div', arr)
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
            if (row.settlementChannel === 162) {
              return h('span', {}, '汇付')
            } else if (row.settlementChannel === 163) {
              return h('span', {}, '富友')
            } else if (row.settlementChannel === 164) {
              return h('span', {}, '对公转账')
            }
          }
        },
        {
          align: "center",
          title: " 归属公司",
          width: 100,
          key: "companyChinaName"
        }
      ];

      this.customerRepayList = []

      this.columns2 = [{
          title: "序号",
          type: "index",
          width: "80",
          align: "center"
        },
        {
          title: "列名",
          key: "columnsName",
          align: "center"
        },
        {
          type: "selection",
          width: "80",
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
     * 获取客户还款查询
     */
    getCustomerRepayList() {
      this.paymentScheduleService.getCustomerPayments(this.customerRepayModel, this.pageService).subscribe(data => {
        this.customerRepayList = data
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    /**
     * 确定
     */
    confirm() {}
  }

</script>

<style>


</style>
