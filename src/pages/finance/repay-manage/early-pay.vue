<!--提前结清-->
<template>
  <section class="page early-pay">
    <page-header title="提前结清"></page-header>
    <data-form data-prop="timeSearch" @on-search="getEarlyPayList" :model="customerRepayModel" hiddenReset>
      <template slot="input">
        <i-form-item prop="dynamicParam">
          <i-input placeholder="请录入客户姓名\证件号码" v-model="customerRepayModel.dynamicParam"></i-input>
        </i-form-item>
        <i-form-item prop="paymentStatus" label="还款状态">
          <i-select placeholder="请选择还款状态" v-model="customerRepayModel.paymentStatus" clearable>
            <i-option v-for="{value,label} in $dict.getDictData('0104')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="settlementChannel" label="结算通道">
          <i-select placeholder="请选择结算通道" v-model="customerRepayModel.settlementChannel" clearable>
            <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </template>
    </data-form>

    <data-box :id="420" :columns="columns1" :data="customerRepayList" @onPageChange="getEarlyPayList" :page="pageService"></data-box>

    <template>
      <i-modal v-model="confirmRepaymentModal" :transfer="false" title="确认结清" :width="900">
        <confirm-early-pay ref="confirm-early-pay"></confirm-early-pay>
        <div slot="footer">
          <!--<i-button @click="saveDraft" class="highDefaultButton">保存草稿</i-button>-->
          <i-button @click="confirmRepayment" class="highButton">确认</i-button>
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

    <template>
      <i-modal v-model="repayInfoModal" title="还款详情" :width="900" :transfer="false">
        <repay-info ref="repay-info"></repay-info>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="deductRecordModal" title="划扣记录" :width="1300">
        <deduct-record-has-search ref="deduct-record-has-search"></deduct-record-has-search>
      </i-modal>
    </template>


    <template>
      <i-modal title="订单详情" :width="1200" id="orderDetail" v-model="purchaseInformationModal" class="purchaseInformation" @on-visible-change="visibleChange">
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
  import CustomerSettleModal from "~/components/finance-manage/customer-settle-modal.vue";
  import ConfirmEarlyPay from "~/components/finance-manage/confirm-early-pay.vue";
  import DeductRecord from "~/components/finance-manage/deduct-record.vue";
  import RepayInfo from "~/components/finance-manage/repay-info.vue";
  import DeductRecordHasSearch from "~/components/finance-manage/deduct-record-has-search.vue";
  import PurchaseInformation from "~/components/purchase-manage/purchase-information.vue";
  import SvgIcon from '~/components/common/svg-icon.vue';
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
      PurchaseInformation,
      CustomerSettleModal,
      SvgIcon,
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

    private scrollTopHeight = 0;
    private customerRepayList: Array < Object > = [];
    private columns1: any;
    private columns2: any = [];
    private searchOptions: Boolean = false;
    private purchaseInformationModal: Boolean = false;
    private confirmRepaymentModal: Boolean = false;
    private repayInfoModal: Boolean = false;
    private deductRecordModal: Boolean = false;
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
    activated() {
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
    /**
     * 保存草稿
     */
    saveDraft() {
      let _repayment: any = this.$refs['confirm-early-pay']
      let data: any = {}
      data.addFinanceUploadResource = _repayment.addFinanceUploadResource
      data.delFinanceUploadResource = _repayment.delFinanceUploadResource
      data.collectMoneyDetails = _repayment.collectMoneyDetails
      data.financeUploadResources = _repayment.financeUploadResources
      data.orderId = _repayment.rowObj.orderId
      data.businessId = _repayment.rowObj.withdrawId
      data.totalPayment = _repayment.paymentAmount
      data.collectMoneyId = _repayment.repaymentObj.withdrawApplicationId
      data.withdrawApplicationId = _repayment.withdrawApplicationId
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
      // let earlyClear: any = this.$refs['confirm-early-pay']
      // earlyClear.earlyClear()
      let _repayment: any = this.$refs['confirm-early-pay']
      let data: any = {}
      data.addFinanceUploadResource = _repayment.addFinanceUploadResource
      data.delFinanceUploadResource = _repayment.delFinanceUploadResource
      data.collectMoneyDetails = _repayment.collectMoneyDetails
      data.orderId = _repayment.rowObj.orderId
      data.businessId = _repayment.rowObj.withdrawId
      data.totalPayment = _repayment.paymentAmount
      data.withdrawApplicationId = _repayment.withdrawApplicationId
      data.collectMoneyId = _repayment.repaymentObj.withdrawApplicationId
      this.advancePayoffService.saveCollectMoneyHistory(data).subscribe(data => {
        this.$Message.info('操作成功！')
        this.confirmRepaymentModal = false
        this.pageService.reset()
        this.getEarlyPayList()
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
      this.columns1 = [{
          title: "操作",
          minWidth: this.$common.getColumnWidth(5),
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
                  this.confirmRepaymentModal = true
                  let _repayment: any = this.$refs['confirm-early-pay']
                  _repayment.refresh(row)
                }
              },
              style: {
                color: '#265EA2'
              }
            }, '确认结清')] : [
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
            ]
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
          minWidth: this.$common.getColumnWidth(6),
          editable: true,
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
          editable: true,
          key: "clientNumber",
          minWidth: this.$common.getColumnWidth(4),
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
          editable: true,
          title: "客户姓名",
          key: "name",
          minWidth: this.$common.getColumnWidth(3),
        },
        {
          align: "center",
          title: " 证件号",
          editable: true,
          key: "idCard",
          minWidth: this.$common.getColumnWidth(5),
        },
        {
          align: "center",
          title: " 手机号",
          key: "mobileMain",
          editable: true,
          minWidth: this.$common.getColumnWidth(4),
        },
        {
          align: "center",
          title: " 订单创建时间",
          editable: true,
          key: "createTime",
          minWidth: this.$common.getColumnWidth(5),
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
          editable: true,
          minWidth: this.$common.getColumnWidth(4),
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
          editable: true,
          minWidth: this.$common.getColumnWidth(4),
          render: (h, { row }) => {
            return h(
              "div",
              {
                style: {
                  textAlign: "right"
                }
              },
              this.$filter.toThousands(row.principalReceivable)
            );
          }
        },
        {
          align: "center",
          title: " 待还利息",
          key: "interestReceivable",
          editable: true,
          minWidth: this.$common.getColumnWidth(4),
          render: (h, { row }) => {
            return h(
              "div",
              {
                style: {
                  textAlign: "right"
                }
              },
              this.$filter.toThousands(row.interestReceivable)
            );
          }
        },
        {
          align: "center",
          title: " 待还罚息",
          key: "penaltyReceivable",
          editable: true,
          minWidth: this.$common.getColumnWidth(4),
          render: (h, { row }) => {
            return h(
              "div",
              {
                style: {
                  textAlign: "right"
                }
              },
              this.$filter.toThousands(row.penaltyReceivable)
            );
          }
        },
        {
          align: "center",
          title: " 利率%/月",
          key: "productRate",
          editable: true,
          minWidth: this.$common.getColumnWidth(2),
        },
        {
          align: "center",
          editable: true,
          title: " 结算通道",
          key: "settlementChannel",
          minWidth: this.$common.getColumnWidth(4),
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
          editable: true,
          minWidth: this.$common.getColumnWidth(4),
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
  .page.early-pay {
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

</style>
