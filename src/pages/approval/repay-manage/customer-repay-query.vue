<!--客户还款查询-->
<template>
    <section class="page customer-repay-query">
        <page-header title="客户还款查询" hiddenPrint hiddenExport></page-header>
        <data-form date-prop="timeSearch" :model="customerRepayModel" @on-search="getCustomerRepayList" hidden-reset>
            <template slot="input">
                <i-form-item prop="dynamicParam">
                    <i-input placeholder="请录入客户姓名\证件号码" v-model="customerRepayModel.dynamicParam"></i-input>
                </i-form-item>
                <i-form-item prop="paymentStatus">
                    <i-select placeholder="全部还款状态" v-model="customerRepayModel.paymentStatus" clearable>
                        <i-option v-for="{value,label} in $dict.getDictData('0104')" :key="value" :label="label" :value="value"></i-option>
                    </i-select>
                </i-form-item>
                <i-form-item prop="settlementChannel">
                    <i-select placeholder="全部结算通道" v-model="customerRepayModel.settlementChannel" clearable>
                        <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
                    </i-select>
                </i-form-item>
            </template>
        </data-form>
        <data-box :id="331" :columns="columns1" :data="customerRepayList" @onPageChange="getCustomerRepayList" :page="pageService"></data-box>
        <div>
        </div>

        <template>
            <i-modal title="还款详情" :transfer="false" v-model="repayInfoModal" width="1300" class="repay-info">
                <repay-info ref="repay-info"></repay-info>
            </i-modal>
        </template>

        <template>
            <i-modal title="还款总览" :transfer="false" width="1050" v-model="repaySumModal" class="repay-sum">
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

        <template>
            <i-modal title="订单详情" width="1000" v-model="purchaseInfoModal" class="purchaseInformation">
                <purchase-information ref="purchase-info"></purchase-information>
                <div slot="footer">
                    <i-button class="blueButton" @click="purchaseInfoModal=false">返回</i-button>
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
import { FilterService } from '~/utils/filter.service'
import PurchaseInformation from '~/components/purchase-manage/purchase-information.vue'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    RepaySum,
    // 客户结算号弹窗
    CustomerSettleModal,
    // 还款详情
    RepayInfo,
    PurchaseInformation
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
  private purchaseInfoModal: Boolean = false
  private customerRepayModel: any = {
    settlementChannel: '',
    paymentStatus: '',
    dynamicParam: '',
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
        width: 220,
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
        render: (h, { row, column, index }) => {
          return h(
            'i-button',
            {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  this.checkOrderInfo(row)
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
        key: 'name'
      },
      {
        align: 'center',
        editable: true,
        title: ' 证件号',
        key: 'idCard'
      },
      {
        align: 'center',
        editable: true,
        title: ' 手机号',
        key: 'mobileMain'
      },
      {
        align: 'center',
        editable: true,
        title: ' 订单创建时间',
        key: 'createTime',
        render: (h, { row, column, index }) => {
          return h(
            'span',
            FilterService.dateFormat(row.createTime, 'yyyy-MM-dd hh:mm:ss')
          )
        }
      },
      {
        align: 'center',
        editable: true,
        title: ' 合同生效日',
        key: 'contractDate',
        render: (h, { row, column, index }) => {
          return h(
            'span',
            FilterService.dateFormat(row.contractDate, 'yyyy-MM-dd hh:mm:ss')
          )
        }
      },
      {
        align: 'center',
        editable: true,
        title: ' 待还本金',
        key: 'principalReceivable'
      },
      {
        align: 'center',
        editable: true,
        title: ' 待还利息',
        key: 'interestReceivable'
      },
      {
        align: 'center',
        editable: true,
        title: ' 待还罚息',
        key: 'penaltyReceivable'
      },
      {
        align: 'center',
        editable: true,
        title: ' 利率%/月',
        key: 'productRate'
      },
      {
        align: 'center',
        editable: true,
        title: ' 结算通道',
        key: 'settlementChannel',
        render: (h, { row, columns, index }) => {
          return h('span', {}, this.$dict.getDictName(row.settlementChannel))
        }
      },
      {
        align: 'center',
        editable: true,
        title: ' 归属公司',
        key: 'companyChinaName'
      }
    ]
  }

  openSearch() {
    this.searchOptions = !this.searchOptions
  }

  checkOrderInfo(row) {
    this.purchaseInfoModal = true
    let _purchaseInfo: any = this.$refs['purchase-info']
    _purchaseInfo.getOrderDetail(row)
  }

  repaySum(row) {}

  trailerCar(row) {}

  /**
   * 查看凭证
   */
  checkProof(row) {}

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
