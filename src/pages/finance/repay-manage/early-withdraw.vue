<!--提前收回-->
<template>
  <section class="page early-withdraw">
    <page-header title="提前收回" hiddenPrint hiddenExport></page-header>
    <data-form data-prop="timeSearch" hidden-reset @on-search="getEarlyPayList">
      <template slot="input">
        <i-form-item>
          <i-input placeholder="请录入客户姓名\证件号码"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :id="428" :columns="columns1" :data="data1" @onPageChange="getEarlyPayList" :page="pageService"></data-box>
    <!--确认收回-->
    <template>
      <i-modal title="确认收回" :width="930" v-model="confirmWithdrawModal" class="confirmWithdraw">
        <confirm-withdraw ref="confirm-withdraw"></confirm-withdraw>
        <div slot="footer">
          <!--<i-button class="highDefaultButton" @click="saveDraft">保存草稿</i-button>-->
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
      <i-modal v-model="repayInfoModal" :transfer="false" title="还款详情" :width="1200">
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
import CustomerSettleModal from "~/components/finance-manage/customer-settle-modal.vue";
import PurchaseInformation from "~/components/purchase-manage/purchase-information.vue";
import { AdvanceRevokeService } from "~/services/manage-service/advance-revoke.service";
import { PageService } from "~/utils/page.service";
import { Dependencies } from "~/core/decorator";
import { Layout } from "~/core/decorator";

@Layout("workspace")
@Component({

  components: {
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
  private data1: Array<Object> = [];
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
    data.financeUploadResource = _repayment.fodderList //上传资料
    data.totalPayment = _repayment.totalMoney //收款总金额
    data.collectMoneyChannel = _repayment.pipeSelect //结算通道
    data.remark = _repayment.remark //备注
    data.orderId = _repayment.rowObj.orderId
    data.businessId = _repayment.rowObj.withdrawId
    data.withdrawApplicationId = _repayment.rowObj.withdrawId
    data.collectMoneyId = _repayment.collectMoneyId
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
      minWidth: this.$common.getColumnWidth(6),
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
              this.$dialog.show({
                title: '订单详情',
                footer: true,
                width: 1200,
                isView: true,
                render: h => h(PurchaseInformation, { props: { orderNumber: row.orderNumber } })
              })
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
      minWidth: this.$common.getColumnWidth(6),
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
      minWidth: this.$common.getColumnWidth(3),
    },
    {
      align: "center",
      title: " 证件号",
      editable: true,
      key: "idCard",
      minWidth: this.$common.getColumnWidth(6),
    },
    {
      align: "center",
      title: " 手机号",
      editable: true,
      key: "mobileMain",
      minWidth: this.$common.getColumnWidth(5),
    },
    {
      align: "center",
      title: " 订单创建时间",
      editable: true,
      key: "createTime",
      minWidth: this.$common.getColumnWidth(6),
      render: (h, {
            row,
        column,
        index
          }) => {
        return h('span', this.$filter.dateFormat(row.createTime, 'yyyy-MM-dd hh:mm:ss'))
      }
    },
    {
      align: "center",
      title: " 合同生效日",
      editable: true,
      key: "contractDate",
      minWidth: this.$common.getColumnWidth(4),
      render: (h, {
            row,
        column,
        index
          }) => {
        return h('span', this.$filter.dateFormat(row.contractDate, 'yyyy-MM-dd hh:mm:ss'))
      }
    },
    {
      align: "center",
      title: " 结算通道",
      editable: true,
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
      minWidth: this.$common.getColumnWidth(4),
      editable: true,
      key: "companyChinaName"
    }
    ];
  }
  /**
   * 确定
   */
  confirm() { }
}

</script>

<style lang="less">
.page.early-withdraw {
  .data-form {
    margin-top: 10px;
  }
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

.confirmWithdraw {
  .ivu-modal-body {
    height: 600px;
    overflow: auto;
  }
}
</style>
