<!--客户还款查询-->
<template>
  <section class="page customer-repay-query"> 
    <page-header title="客户还款查询" hiddenPrint hiddenExport></page-header>
    <data-form date-prop="timeSearch" :model="customerRepayModel" @on-search="getCustomerRepayList" :page="pageService">
      <template slot="input">
        <!-- <i-form-item prop="dynamicParam">
          <i-input placeholder="请录入客户姓名\证件号码" v-model="customerRepayModel.dynamicParam"></i-input>
        </i-form-item> -->
        <!-- <i-form-item prop="settlementChannel" label="结算通道">
          <i-select placeholder="请选择结算通道" v-model="customerRepayModel.settlementChannel" clearable>
            <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item> -->
        <i-form-item prop="personalName" label="客户姓名">
          <i-input v-model="customerRepayModel.personalName" placeholder="请输入客户姓名"></i-input>
        </i-form-item>
        <i-form-item prop="idCard" label="证件号码">
          <i-input v-model="customerRepayModel.idCard" placeholder="请输入证件号码"></i-input>
        </i-form-item>
        <i-form-item prop="orderNumber" label="订单编号">
          <i-input v-model="customerRepayModel.orderNumber" placeholder="请输入联系电话"></i-input>
        </i-form-item>
         <i-form-item prop="paymentStatus" label="还款状态">
          <i-select placeholder="请选择还款状态" v-model="customerRepayModel.paymentStatus" clearable>
            <i-option v-for="{value,label} in $dict.getDictData('0104')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </template>
    </data-form>
    <data-box :id="331" :columns="columns1" :data="customerRepayList" @onPageChange="getCustomerRepayList" :page="pageService"></data-box>
    <div>
    </div>

    <template>
      <i-modal title="还款详情" :transfer="false" v-model="repayInfoModal" :width="1300" class="repay-info">
        <repay-info ref="repay-info"></repay-info>
      </i-modal>
    </template>

    <template>
      <i-modal title="还款总览" :transfer="false" :width="1050" v-model="repaySumModal" class="repay-sum">
        <repay-sum ref="repay-sum"></repay-sum>
      </i-modal>
    </template>

    <template>
      <i-modal title="客户当前结算号" :transfer="false" v-model="customerSettleModal">
        <customer-settle-modal ref="customer-settle"></customer-settle-modal>
        <div slot="footer">
          <i-button @click="customerSettleModal=false" class="blueButton">关闭</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import DataBox from '~/components/common/data-box.vue'
import Component from 'vue-class-component'
import RepaySum from '~/components/approval-manage/repay-sum.vue'
import CustomerSettleModal from '~/components/approval-manage/customer-settle-modal.vue'
import { Dependencies } from '~/core/decorator'
import { PaymentScheduleService } from '~/services/manage-service/payment-schedule.service'
import { Layout } from '~/core/decorator'
import RepayInfo from '~/components/approval-manage/repay-info.vue'
import { PageService } from '~/utils/page.service'
import PurchaseInformation from '~/components/purchase-manage/purchase-information.vue'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    RepaySum,
    // 客户结算号弹窗
    CustomerSettleModal,
    // 还款详情
    RepayInfo
  }
})
export default class CustomerRepayQuery extends Page {
  @Dependencies(PaymentScheduleService)
  private paymentScheduleService: PaymentScheduleService
  @Dependencies(PageService) private pageService: PageService
  private columns1: any
  private customerRepayList: Array<Object> = []
  private repayInfoModal: Boolean = false
  private ceshiShow: Boolean = false
  private searchOptions: Boolean = false
  private repaySumModal: Boolean = false
  private customerSettleModal: Boolean = false
  private customerRepayModel: any = {
    personalName:'', // 客户姓名
    idCard:'',   // 证件号码
    orderNumber:'',      // 订单编号
    settlementChannel: '',
    paymentStatus: '',
    timeSearch: ''
  }
  private personalId: any = ''
  private businessId: any = ''

  mounted() {
    this.getCustomerRepayList()
  }

  created() {
    this.columns1 = [
      {
        title: '操作',
        minWidth: this.$common.getColumnWidth(7),
        fixed: 'left',
        align: 'center',
        render: (h, { row, column, index }) => {
          return h('div', [
            h(
              'i-button',
              {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265EA2'
                },
                on: {
                  click: () => {
                    this.repaySumClick(row)
                  }
                }
              },
              '还款总览'
            ),
            h(
              'i-button',
              {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265EA2'
                },
                on: {
                  click: () => {
                    this.repayInfoClick(row)
                  }
                }
              },
              '还款详情'
            )
          ])
        }
      },
      {
        align: 'center',
        title: '订单编号',
        editable: true,
        key: 'orderNumber',
        minWidth: this.$common.getColumnWidth(7),
        render: (h, { row, column, index }) => {
          return h(
            'i-button',
            {
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
            },
            row.orderNumber
          )
        }
      },
      {
        align: 'center',
        title: '客户结算号',
        editable: true,
        key: 'clientNumber',
        minWidth: this.$common.getColumnWidth(10),
        render: (h, { row, column, index }) => {
          return h(
            'i-button',
            {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  this.customerSettleClick(row)
                }
              }
            },
            row.clientNumber
          )
        }
      },
      {
        align: 'center',
        title: '客户姓名',
        editable: true,
        minWidth: this.$common.getColumnWidth(5),
        key: 'name'
      },
      {
        align: 'center',
        editable: true,
        title: ' 证件号',
        minWidth: this.$common.getColumnWidth(7),
        key: 'idCard'
      },
      {
        align: 'center',
        editable: true,
        title: ' 手机号',
        minWidth: this.$common.getColumnWidth(7),
        key: 'mobileMain'
      },
      {
        align: 'center',
        editable: true,
        title: ' 订单创建时间',
        key: 'createTime',
        minWidth: this.$common.getColumnWidth(7),
        render: (h, { row, column, index }) => {
          return h(
            'span',
            this.$filter.dateFormat(row.createTime, 'yyyy-MM-dd hh:mm:ss')
          )
        }
      },
      {
        align: 'center',
        editable: true,
        title: ' 合同生效日',
        key: 'contractDate',
        minWidth: this.$common.getColumnWidth(7),
        render: (h, { row, column, index }) => {
          return h(
            'span',
            this.$filter.dateFormat(row.contractDate, 'yyyy-MM-dd hh:mm:ss')
          )
        }
      },
      {
        align: 'center',
        editable: true,
        title: ' 待还本金',
        key: 'principalReceivable',
        minWidth: this.$common.getColumnWidth(6),
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
        align: 'center',
        editable: true,
        title: ' 待还利息',
        key: 'interestReceivable',
        minWidth: this.$common.getColumnWidth(5),
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
        align: 'center',
        editable: true,
        title: ' 待还罚息',
        key: 'penaltyReceivable',
        minWidth: this.$common.getColumnWidth(5),
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
        align: 'center',
        editable: true,
        title: ' 月利率',
        key: 'productRate',
        minWidth: this.$common.getColumnWidth(5),
        render: (h, { row }) => h('p', this.$filter.decimalToPrecent(row.productRate))
      },
      {
        align: 'center',
        editable: true,
        title: ' 结算通道',
        key: 'settlementChannel',
        minWidth: this.$common.getColumnWidth(5),
        render: (h, { row, columns, index }) => {
          return h('span', {}, this.$dict.getDictName(row.settlementChannel))
        }
      },
      {
        align: 'center',
        editable: true,
        title: ' 归属公司',
        minWidth: this.$common.getColumnWidth(5),
        key: 'companyChinaName'
      }
    ]
  }

  openSearch() {
    this.searchOptions = !this.searchOptions
  }

  repaySum(row) { }

  trailerCar(row) { }

  /**
   * 查看凭证
   */
  checkProof(row) { }

  /**
   * 获取客户还款查询
   */
  getCustomerRepayList() {
    this.paymentScheduleService
      .getCustomerPayments(this.customerRepayModel, this.pageService)
      .subscribe(
      data => {
        this.customerRepayList = data
      },
      ({ msg }) => {
        this.$Message.error(msg)
      }
      )
  }

  getTimeSearch(val) {
    this.customerRepayModel.settlementChannel = ''
    this.customerRepayModel.paymentStatus = ''
    this.customerRepayModel.dynamicParam = ''
    this.customerRepayModel.timeSearch = val
    this.getCustomerRepayList()
    this.customerRepayModel.timeSearch = ''
  }

  /**
   * 还款详情
   */
  repayInfoClick(row) {
    this.repayInfoModal = true
    let orderId = row.orderId
    let _repayInfo: any = this.$refs['repay-info']
    _repayInfo.getRepayInfo(orderId)
  }

  /**
   * 还款总揽
   */
  repaySumClick(row) {
    this.repaySumModal = true
    let orderId = row.orderId
    let _repaySum: any = this.$refs['repay-sum']
    _repaySum.getRepaySum(orderId)
  }

  customerSettleClick(row) {
    this.customerSettleModal = true
    let _customerSettle: any = this.$refs['customer-settle']
    _customerSettle.getCustomerSettleObj(row)
  }
}
</script>
<style lang="less">
.seek-day {
  margin-top: 10px;
}
.repay-sum,
.repay-info {
  .ivu-modal-footer {
    display: none;
  }
}

.page.customer-repay-query {
  .open-search {
    color: #265ea2;
  }
  .data-form {
    margin: 6px;
    position: relative;
    right: 10px;
  }
  .data-form-item {
    &.search-input {
      display: inline-block;
      margin-left: 20px;
      width: 16%;
    }
    &.payment-status {
      margin-left: 10px;
      width: 10%;
    }
    &.settlement-channel {
      margin-left: 10px;
      width: 10%;
    }
    &.search-button {
      margin-left: 20px;
    }
  }
}
</style>
