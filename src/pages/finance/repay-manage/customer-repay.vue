<!--客户还款-->
<template>
  <section class="page customer-repay">
    <page-header title="客户还款"></page-header>
    <data-form date-prop="timeSearch" :model="customerRepayModel" @on-search="getCustomerRepayList" hidden-reset>
      <template slot="input">
        <i-form-item prop="dynamicParam">
          <i-input class="second-input" placeholder="请录入客户姓名\证件号码" v-model="customerRepayModel.dynamicParam"></i-input>
        </i-form-item>
        <i-form-item prop="paymentStatus" label="还款状态">
          <i-select class="second-select" placeholder="请选择还款状态" v-model="customerRepayModel.paymentStatus" clearable>
            <i-option v-for="{value,label} in $dict.getDictData('0104')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="settlementChannel" label="结算通道">
          <i-select class="second-select" placeholder="请选择结算通道" v-model="customerRepayModel.settlementChannel" clearable>
            <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </template>
    </data-form>
    <data-box :id="412" :columns="columns1" :data="customerRepayList" @onPageChange="getCustomerRepayList" :page="pageService"></data-box>

    <template>
      <i-modal v-model="confirmRepaymentModal" :transfer="false" title="确认还款" width="900">
        <confirm-repayment ref="confirm-repayment"></confirm-repayment>
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
      <i-modal v-model="repayInfoModal" :transfer="false" title="还款详情" width="1200">
        <repay-info ref="repay-info"></repay-info>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="deductRecordModal" title="划扣记录" width="1300">
        <deduct-record-has-search ref="deduct-record-has-search"></deduct-record-has-search>
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
import ConfirmRepayment from "~/components/finance-manage/confirm-repayment.vue";
import DeductRecordHasSearch from "~/components/finance-manage/deduct-record-has-search.vue";
import RepayInfo from "~/components/finance-manage/repay-info.vue";
import SvgIcon from "~/components/common/svg-icon.vue";
import CustomerSettleModal from "~/components/finance-manage/customer-settle-modal.vue";
import PurchaseInformation from "~/components/purchase-manage/purchase-information.vue";
import { Tooltip } from "iview";
import { Dependencies } from "~/core/decorator";
import { Layout } from "~/core/decorator";
import { PaymentScheduleService } from "~/services/manage-service/payment-schedule.service";
import { PageService } from "~/utils/page.service";
import { FilterService } from "~/utils/filter.service";

@Layout("workspace")
@Component({
  components: {
    CustomerSettleModal,
    SvgIcon,
    DataBox,
    ConfirmRepayment,
    DeductRecordHasSearch,
    RepayInfo,
    PurchaseInformation
  }
})
export default class CustomerRepay extends Page {
  @Dependencies(PaymentScheduleService)
  private paymentScheduleService: PaymentScheduleService;
  @Dependencies(PageService) private pageService: PageService;
  private scrollTopHeight = 0;
  private columns1: any;
  private customerRepayList: Array<Object> = [];
  private columns2: any;
  private data2: Array<Object> = [];
  private purchaseInformationModal: Boolean = false;
  private searchOptions: Boolean = false;
  private confirmRepaymentModal: Boolean = false;
  private repayInfoModal: Boolean = false;
  private deductRecordModal: Boolean = false;
  private customerSettleModal: Boolean = false;
  private customerRepayModel: any = {
    settlementChannel: "",
    paymentStatus: "",
    dynamicParam: "",
    timeSearch: ""
  };
  mounted() {
    this.getCustomerRepayList();
  }
  openSearch() {
    this.searchOptions = !this.searchOptions;
  }
  getTimeSearch(val) {
    this.customerRepayModel.settlementChannel = "";
    this.customerRepayModel.paymentStatus = "";
    this.customerRepayModel.dynamicParam = "";
    this.customerRepayModel.timeSearch = val;
    this.getCustomerRepayList();
    this.customerRepayModel.timeSearch = "";
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
    let _repayment: any = this.$refs["confirm-repayment"];
    let data: any = {};
    data.financeUploadResource = _repayment.financeUploadResources;
    data.collectMoneyDetails = _repayment.collectMoneyDetails;
    data.orderId = _repayment.rowObj.orderId;
    data.paymentScheduleId = _repayment.repaymentObj.paymentScheduleId;
    data.collectMoneyId = _repayment.collectMoneyId;
    data.historyId = _repayment.repaymentObj.historyId;
    data.collectMoneySum = _repayment.collectMoneySum;
    data.remark = _repayment.remark;
    this.paymentScheduleService.saveCustomerPaymentInfoAsDraft(data).subscribe(
      data => {
        this.$Message.info("保存草稿成功！");
        this.confirmRepaymentModal = false;
      },
      ({ msg }) => {
        this.$Message.error(msg);
      }
    );
  }
  /**
   * 确认还款
   */
  confirmRepayment() {
    let _repayment: any = this.$refs["confirm-repayment"];
    let data: any = {};
    data.financeUploadResource = _repayment.financeUploadResources;
    data.collectMoneyDetails = _repayment.collectMoneyDetails;
    data.orderId = _repayment.rowObj.orderId;
    data.paymentScheduleId = _repayment.repaymentObj.paymentScheduleId;
    data.historyId = _repayment.repaymentObj.historyId;
    data.collectMoneyId = _repayment.collectMoneyId;
    data.collectMoneySum = _repayment.collectMoneySum;
    data.periods = _repayment.repaymentObj.periods;
    this.paymentScheduleService.saveCustomerPaymentInfo(data).subscribe(
      data => {
        this.$Message.info("还款成功！");
        this.confirmRepaymentModal = false;
        this.pageService.reset();
        this.getCustomerRepayList();
      },
      ({ msg }) => {
        this.$Message.error(msg);
      }
    );
  }
  created() {
    this.columns1 = [
      {
        title: "操作",
        width: 210,
        align: "center",
        fixed: "left",
        render: (h, { row, column, index }) => {
          let arr =
            row.orderStatus === 316 || row.orderStatus === 319
              ? [
                  h(
                    "i-button",
                    {
                      props: {
                        type: "text"
                      },
                      on: {
                        click: () => {
                          this.confirmRepaymentModal = true;
                          let _repayment: any = this.$refs["confirm-repayment"];
                          _repayment.refresh(row);
                        }
                      },
                      style: {
                        color: "#265EA2"
                      }
                    },
                    "确认还款"
                  )
                ]
              : [
                  h(
                    "i-button",
                    {
                      props: {
                        type: "text"
                      },
                      on: {
                        click: () => {
                          this.deductRecordModal = true;
                          let _record: any = this.$refs[
                            "deduct-record-has-search"
                          ];
                          _record.refresh(row);
                        }
                      },
                      style: {
                        color: "#265EA2"
                      }
                    },
                    "划扣记录"
                  )
                ];
          arr.push(
            h(
              "i-button",
              {
                props: {
                  type: "text"
                },
                on: {
                  click: () => {
                    this.repayInfoModal = true;
                    let _repay: any = this.$refs["repay-info"];
                    _repay.refresh(row);
                  }
                },
                style: {
                  color: "#265EA2"
                }
              },
              "还款详情"
            )
          );
          return h("div", arr);
        }
      },
      {
        align: "center",
        title: "订单号",
        editable: true,
        // width: 160,
        key: "orderNumber",
        render: (h, { row, column, index }) => {
          return h(
            "i-button",
            {
              props: {
                type: "text"
              },
              on: {
                click: () => {
                  this.purchaseInformationModal = true;
                  let _purchaseInfo: any = this.$refs["purchase-info"];
                  _purchaseInfo.getOrderDetail(row);
                }
              }
            },
            row.orderNumber
          );
        }
      },
      {
        align: "center",
        title: "客户结算号",
        key: "clientNumber",
        editable: true,
        // width: 150,
        render: (h, { row, column, index }) => {
          return h(
            "i-button",
            {
              props: {
                type: "text"
              },
              on: {
                click: () => {
                  this.customerSettleModal = true;
                  let _customerSettle: any = this.$refs["customer-settle"];
                  _customerSettle.getCustomerSettleObj(row);
                }
              }
            },
            row.clientNumber
          );
        }
      },
      {
        align: "center",
        title: "客户姓名",
        editable: true,
        key: "name"
        // width: 100
      },
      {
        align: "center",
        title: " 证件号",
        editable: true,
        key: "idCard"
        // width: 160
      },
      {
        align: "center",
        title: " 手机号",
        editable: true,
        key: "mobileMain"
        // width: 120
      },
      {
        align: "center",
        title: " 订单创建时间",
        editable: true,
        key: "createTime",
        // width: 160,
        render: (h, { row, column, index }) => {
          return h(
            "span",
            FilterService.dateFormat(row.createTime, "yyyy-MM-dd hh:mm:ss")
          );
        }
      },
      {
        align: "center",
        title: " 合同生效日",
        editable: true,
        key: "contractDate",
        // width: 160,
        render: (h, { row, column, index }) => {
          return h(
            "span",
            FilterService.dateFormat(row.contractDate, "yyyy-MM-dd hh:mm:ss")
          );
        }
      },
      {
        align: "center",
        title: " 待还本金",
        editable: true,
        key: "principalReceivable"
        // width: 90
      },
      {
        align: "center",
        title: " 待还利息",
        editable: true,
        key: "interestReceivable"
        // width: 90
      },
      {
        align: "center",
        title: " 待还管理费",
        editable: true,
        key: "manageFeeReceivable"
        // width: 90
      },
      {
        align: "center",
        title: " 待还总金额",
        editable: true,
        key: "sumReceivable"
        // width: 90
      },
      {
        align: "center",
        title: " 待还罚息",
        editable: true,
        key: "penaltyReceivable"
        // width: 90
      },
      {
        align: "center",
        title: " 利率%/月",
        editable: true,
        key: "productRate"
        // width: 90
      },
      {
        align: "center",
        title: " 结算通道",
        editable: true,
        key: "settlementChannel",
        // width: 100,
        render: (h, { row, column, index }) => {
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

    this.customerRepayList = [];
  }

  /**
   * 获取客户还款查询
   */
  getCustomerRepayList() {
    this.paymentScheduleService
      .getCustomerPayments(this.customerRepayModel, this.pageService)
      .subscribe(
        data => {
          this.customerRepayList = data;
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  /**
   * 确定
   */
  confirm() {}
}
</script>

<style lang="less">
.page.customer-repay {
  .form-button {
    color: #265ea2;
  }
  .importBtn {
    float: right;
    margin-right: 13px;
    margin-top: 10px;
    .importBtn-item {
      cursor: pointer;
      display: inline-block;
      margin-left: 10px;
      color: #3367a7;
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
      width: 16%;
    }
    .second-select {
      margin-left: 10px;
      width: 10%;
    }
  }
}
</style>
