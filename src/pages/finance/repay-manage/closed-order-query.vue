<!--已结清订单查询-->
<template>
  <section class="page closed-order-query">
    <page-header title="已结清订单查询"></page-header>
    <data-form data-prop="timeSearch" :model="customerRepayModel" @on-search="getEarlyPayList">
      <template slot="input">
        <i-form-item prop="dynamicParam">
          <i-input placeholder="请录入客户姓名\证件号码" v-model="customerRepayModel.dynamicParam"></i-input>
        </i-form-item>
        <i-form-item prop="paymentStatus" label="还款状态">
          <i-select placeholder="全部还款状态" v-model="customerRepayModel.paymentStatus" clearable>
            <i-option v-for="{value,label} in $dict.getDictData('0104')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="settlementChannel" label="结算通道">
          <i-select placeholder="全部结算通道" v-model="customerRepayModel.settlementChannel" clearable>
            <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
        <!--<i-button class="blueButton" @click="getEarlyPayList">搜索</i-button>-->
      </template>
    </data-form>
    <data-box :id="435" :columns="columns1" :data="data1" @onPageChange="getEarlyPayList" :page="pageService"></data-box>

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
import ConfirmRepayment from "~/components/finance-manage/confirm-repayment.vue";
import DeductRecord from "~/components/finance-manage/deduct-record.vue";
import RepayInfo from "~/components/finance-manage/repay-info.vue";
import SvgIcon from '~/components/common/svg-icon.vue';
import CustomerSettleModal from "~/components/finance-manage/customer-settle-modal.vue";
import PurchaseInformation from "~/components/purchase-manage/purchase-information.vue";
import { PayoffProductOrderService } from "~/services/manage-service/payoff-product-order.service";
import { PageService } from "~/utils/page.service";
import { FilterService } from "~/utils/filter.service"
import { Tooltip } from 'iview'
import { Dependencies } from "~/core/decorator";
import { Layout } from "~/core/decorator";

@Layout("workspace")
@Component({
  components: {
    PurchaseInformation,
    CustomerSettleModal,
    SvgIcon,
    DataBox,
    ConfirmRepayment,
    DeductRecord,
    RepayInfo
  }
})
export default class ClosedOrderQuery extends Page {
  @Dependencies(PayoffProductOrderService) private payoffProductOrderService: PayoffProductOrderService;
  @Dependencies(PageService) private pageService: PageService;
  private scrollTopHeight = 0;
  private customerSettleModal: Boolean = false;
  private columns1: any = [];
  private data1: Array<Object> = [];
  private searchOptions: Boolean = false;
  private openColumnsConfig: Boolean = false;
  private repayInfoModal: Boolean = false;
  private purchaseInformationModal: Boolean = false;
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
    this.payoffProductOrderService.getPayoffProductOrders(this.customerRepayModel, this.pageService).subscribe(data => {
      this.data1 = data
    }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
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
    },
    {
      align: "center",
      title: "订单编号",
      minWidth: this.$common.getColumnWidth(6),
      key: 'orderNumber',
      editable: true,
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
              // row.orderNumber = row.orderId
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
      minWidth: this.$common.getColumnWidth(6),
      editable: true,
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
      key: "customerName",
      editable: true,
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
      key: "mobileMain",
      editable: true,
      minWidth: this.$common.getColumnWidth(5),
    },
    {
      align: "center",
      title: " 合同生效日",
      key: "contractDate",
      editable: true,
      minWidth: this.$common.getColumnWidth(6),
      render: (h, { row }) => h('span', this.$filter.dateFormat(row.contractDate, 'yyyy-MM-dd'))
    },
    {
      align: "center",
      title: " 结清日期",
      key: "settlementDay",
      editable: true,
      minWidth: this.$common.getColumnWidth(6),
      render: (h, { row }) => h('span', this.$filter.dateFormat(row.settlementDay, 'yyyy-MM-dd'))
    },
    {
      align: "center",
      title: " 利率%/月",
      key: "productRate",
      editable: true,
      minWidth: this.$common.getColumnWidth(2),
      render: (h, { row }) => h('p', this.$filter.decimalToPrecent(row.productRate))
    },
    {
      align: "center",
      editable: true,
      title: " 结算通道",
      key: "settlementChannel",
      minWidth: this.$common.getColumnWidth(4),
      render: (h, { row }) => h("span", {}, this.$dict.getDictName(row.settlementChannel))
    },
    {
      align: "center",
      title: " 结清状态",
      key: "settlementType",
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      render: (h, { row }) => h("span", {}, this.$dict.getDictName(row.settlementType))
    },
    {
      align: "center",
      title: " 归属公司",
      minWidth: this.$common.getColumnWidth(6),
      editable: true,
      key: "companyChinaName"
    }
    ];

  }
  columnsConfig() {
    this.openColumnsConfig = true;
  }
  /**
   * 确定
   */
  confirm() { }
}

</script>
<style lang="less">
.page.closed-order-query {
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
</style>
