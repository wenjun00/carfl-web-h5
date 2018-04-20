<!--客户还款-->
<template>
  <section class="page early-withdraw">
    <page-header title="提前收回"></page-header>
    <data-form data-prop="timeSearch" @on-search="getEarlyPayList" hidden-reset>
      <template slot="input">
        <i-form-item>
          <i-input placeholder="请录入客户姓名\证件号码"></i-input>
        </i-form-item>
        <i-form-item>
          <i-select placeholder="全部还款状态">
            <i-option value="正常还款客户" key="正常还款客户" label="正常还款客户"></i-option>
            <i-option value="逾期客户" key="逾期客户" label="逾期客户"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item>
          <i-select placeholder="全部结算通道">
            <i-option value="汇付" key="汇付" label="汇付"></i-option>
            <i-option value="富友" key="富友" label="富友"></i-option>
            <i-option value="支付宝" key="支付宝" label="支付宝"></i-option>
            <i-option value="现金" key="现金" label="现金"></i-option>
          </i-select>
        </i-form-item>
      </template>
    </data-form>
    <data-box :id="428" :columns="columns1" :data="data1" @onPageChange="getEarlyPayList" :page="pageService"></data-box>
    <!--确认收回-->
    <template>
      <i-modal title="确认收回" width="930" v-model="confirmWithdrawModal" class="confirmWithdraw">
        <confirm-withdraw ref="confirm-withdraw"></confirm-withdraw>
        <div slot="footer">
          <i-button class="highDefaultButton" @click="saveDraft">保存草稿</i-button>
          <i-button class="highButton" @click="confirmRepayment">确认</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal title="客户当前结算户" :transfer="false" v-model="customerSettleModal">
        <customer-settle-modal ref="customer-settle"></customer-settle-modal>
        <div slot="footer">
          <i-button @click="customerSettleModal=false" class="blueButton">关闭</i-button>
        </div>
      </i-modal>
    </template>

    <!--还款详情-->
    <template>
      <i-modal v-model="repayInfoModal" :transfer="false" title="还款详情" width="1200">
        <repay-info ref="repay-info"></repay-info>
      </i-modal>
    </template>

    <template>
      <i-modal title="订单详情" width="1000" id="orderDetail" v-model="purchaseInformationModal" class="purchaseInformation" @on-visible-change="visibleChange">
        <purchase-information :scrollTopHeight="scrollTopHeight" ref="purchase-info"></purchase-information>
        <div slot="footer">
          <i-button class="blueButton" @click="purchaseInformationModal=false">返回</i-button>
        </div>
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
  import CustomerSettleModal from "~/components/finance-manage/customer-settle-modal.vue";
  import PurchaseInformation from "~/components/purchase-manage/purchase-information.vue";
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
      PurchaseInformation,
      CustomerSettleModal,
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
    private scrollTopHeight = 0;
    private columns1: any;
    private data1: Array < Object > = [];
    private searchOptions: Boolean = false;
    private purchaseInformationModal: Boolean = false;
    private openColumnsConfig: Boolean = false;
    private confirmWithdrawModal: Boolean = false;
    private repayInfoModal: Boolean = false;
    private customerSettleModal: Boolean = false;
    private customerRepayModel: any = {
      settlementChannel: '',
      paymentStatus: '',
      dynamicParam: '',
      timeSearch: ''
    }
    mounted() {
      this.getEarlyPayList();
    }
    visibleChange() {
      let target = document.querySelector(".purchaseInformation .ivu-modal-body");
      if (target) {
        target.addEventListener("scroll", this.monitorScorll);
      }
    }
    monitorScorll() {
      let target = document.querySelector(".purchaseInformation .ivu-modal-body");
      if (target) {
        this.scrollTopHeight = target.scrollTop;
      }
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
    /**
     * 保存草稿
     */
    saveDraft() {
      let _repayment: any = this.$refs['confirm-withdraw']
      let data: any = {}
      data.addFinanceUploadResource = _repayment.addFinanceUploadResource
      data.delFinanceUploadResource = _repayment.delFinanceUploadResource
      data.collectMoneyDetails = _repayment.collectMoneyDetails
      data.orderId = _repayment.rowObj.orderId
      data.businessId = _repayment.rowObj.withdrawId
      data.totalPayment = _repayment.paymentAmount
      data.withdrawApplicationId = _repayment.rowObj.withdrawId
      this.advanceRevokeService.saveCollectMoneyHistoryAsDraft(data).subscribe(data => {
        this.$Message.info('保存草稿成功！')
        this.confirmWithdrawModal = false
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
      let _repayment: any = this.$refs['confirm-withdraw']
      let data: any = {}
      data.addFinanceUploadResource = _repayment.addFinanceUploadResource
      data.delFinanceUploadResource = _repayment.delFinanceUploadResource
      data.collectMoneyDetails = _repayment.collectMoneyDetails
      data.orderId = _repayment.rowObj.orderId
      data.businessId = _repayment.rowObj.withdrawId
      data.totalPayment = _repayment.paymentAmount
      data.withdrawApplicationId = _repayment.rowObj.withdrawId
      data.collectMoneyId = _repayment.collectMoneyId
      let name: any = data.collectMoneyDetails.map(v => v.collectItem)
      if (!name.length || name[0] === undefined) {
        this.$Message.warning("请选择收款方式!")
        return
      }
      this.advanceRevokeService.saveCollectMoneyHistory(data).subscribe(data => {
        this.$Message.info('操作成功！')
        this.confirmWithdrawModal = false
        this.pageService.reset()
        this.getEarlyPayList()
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    created() {
      this.columns1 = [{
          title: "操作",
          // width: 220,
          align: "center",
          fixed: "left",
          render: (h, {
            row,
            column,
            index
          }) => {
            let arr = (row.approvalStatus === 108) ? [h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  this.confirmWithdrawModal = true
                  let _repayment: any = this.$refs['confirm-withdraw']
                  _repayment.refresh(row)
                }
              },
              style: {
                color: '#265EA2'
              }
            }, '确认收回')] : []
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
          editable: true,
          // width: 160,
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
                  this.purchaseInformationModal = true;
                  let _purchaseInfo: any = this.$refs["purchase-info"];
                  _purchaseInfo.getOrderDetail(row);
                }
              }
            }, row.orderNumber)
          }
        },
        {
          align: "center",
          title: "客户结算号",
          key: "clientNumber",
          editable: true,
          // width: 150,
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
                  this.customerSettleModal = true;
                  let _customerSettle: any = this.$refs["customer-settle"];
                  _customerSettle.getCustomerSettleObj(row);
                }
              }
            }, row.clientNumber)
          }
        },
        {
          align: "center",
          title: "客户姓名",
          editable: true,
          key: "name",
          // width: 100
        },
        {
          align: "center",
          title: " 证件号",
          editable: true,
          key: "idCard",
          // width: 160
        },
        {
          align: "center",
          title: " 手机号",
          editable: true,
          key: "mobileMain",
          // width: 120
        },
        {
          align: "center",
          title: " 订单创建时间",
          editable: true,
          key: "createTime",
          // width: 160,
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
          editable: true,
          key: "contractDate",
          // width: 160,
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
          title: " 结算通道",
          editable: true,
          key: "settlementChannel",
          // width: 100,
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
          // width: 100,
          editable: true,
          key: "companyChinaName"
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
  .page.early-withdraw {
    .data-form {
      margin-top: 10px;
    }
    .form-button {
      color: #265EA2
    }
    .importBtn {
      float: right;
      margin-right: 13px;
      margin-top: 10px;
      .importBtn-item {
        cursor: pointer;
        display: inline-block;
        margin-left: 10px;
        color: #3367A7;
        .importBtn-item-one {
          font-size: 18px;
        }
        .importBtn-item-two {
          font-size: 12px;
        }
      }
    }
    .second-data {
      margin: 6px;
      position: relative;
      right: 16px;
      .second-input {
        display: inline-block;
        margin-left: 20px;
        width: 16%
      }
      .second-select {
        margin-left: 10px;
        width: 10%
      }
    }
  }

  .confirmWithdraw {
    .ivu-modal-body {
      height: 600px;
      overflow: auto;
    }
  }

</style>
