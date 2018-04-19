<!--冻结申请记录-->
<template>
    <section class="page frozen-apply-record">
        <page-header title="冻结申请记录" hiddenPrint></page-header>
        <data-form date-prop="timeSearch" :model="frozenModel" @on-search="getFrozenList" hidden-reset>
            <template slot="input">
                <i-form-item prop="orderInfo">
                     <i-input v-model="frozenModel.orderInfo" placeholder="请录入客户姓名\证件号码\订单号\手机号查询"></i-input>
                </i-form-item>
                <i-form-item prop="applyDateStart" label="日期：">
                     <i-date-picker v-model="frozenModel.applyDateStart" placeholder="起始日期"></i-date-picker> ~
                </i-form-item>
                <i-form-item prop="applyDateEnd">
                    <i-date-picker v-model="frozenModel.applyDateEnd" placeholder="终止日期"></i-date-picker>
                </i-form-item>
                <i-form-item prop="collectMoneyMethod">
                     <i-select placeholder="全部结算通道" v-model="frozenModel.collectMoneyMethod" clearable>
                        <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
                    </i-select>
                </i-form-item>
            </template>
        </data-form>

        <data-box :id="348" :columns="columns1" :data="frozenList" @onPageChange="getFrozenList" :page="pageService"></data-box>

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
import PurchaseInformation from '~/components/purchase-manage/purchase-information.vue'
import SvgIcon from '~/components/common/svg-icon.vue'
import { Dependencies } from '~/core/decorator'
import { Layout } from '~/core/decorator'
import { PageService } from '~/utils/page.service'
import { FilterService } from '~/utils/filter.service'
import { RemitApplicationService } from '~/services/manage-service/remit-application.service'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    RepaySum,
    SvgIcon,
    PurchaseInformation
  }
})
export default class FrozenApplyRecord extends Page {
  @Dependencies(RemitApplicationService)
  private remitApplicationService: RemitApplicationService
  @Dependencies(PageService) private pageService: PageService
  private columns1: any
  private frozenList: Array<Object> = []
  private repayInfo: Boolean = false
  private purchaseInfoModal: Boolean = false
  private searchOptions: Boolean = false
  private frozenModel: any = {
    remitItem: 1122,
    applyDateStart: '',
    applyDateEnd: '',
    timeSearch: '',
    collectMoneyMethod: '',
    orderInfo: ''
  }

  mounted() {
    this.getFrozenList()
  }

  created() {
    this.columns1 = [
      {
        title: '操作',
        width: 100,
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
                    this.$Modal.confirm({
                      title: '提示',
                      content: '确定解冻吗？',
                      onOk: () => {
                        this.unFrozen(row)
                      }
                    })
                  }
                }
              },
              '解冻'
            )
          ])
        }
      },
      {
        align: 'center',
        editable: true,
        title: '冻结金额',
        key: 'remitAmount'
      },
      {
        align: 'center',
        editable: true,
        title: '冻结期数',
        key: 'periods'
      },
      {
        align: 'center',
        editable: true,
        title: '订单环节',
        key: 'orderLink',
        render: (h, { row, column, index }) => {
          return h('span', {}, this.$dict.getDictName(row.orderLink))
        }
      },
      {
        align: 'center',
        editable: true,
        title: '订单状态',
        key: 'orderStatus',
        render: (h, { row, column, index }) => {
          return h('span', {}, this.$dict.getDictName(row.orderStatus))
        }
      },
      {
        align: 'center',
        editable: true,
        title: '申请时间',
        key: 'applyDate',
        render: (h, { row, column, index }) => {
          return h(
            'span',
            FilterService.dateFormat(row.applyDate, 'yyyy-MM-dd hh:mm:ss')
          )
        }
      },
      {
        align: 'center',
        editable: true,
        title: '客户姓名',
        key: 'name'
      },
      {
        align: 'center',
        editable: true,
        title: '证件号码',
        key: 'idCard'
      },
      {
        align: 'center',
        editable: true,
        title: '手机号',
        key: 'mobileNumber'
      },
      {
        align: 'center',
        editable: true,
        title: '订单创建时间',
        key: 'orderCreateTime',
        render: (h, { row, column, index }) => {
          return h(
            'span',
            FilterService.dateFormat(row.orderCreateTime, 'yyyy-MM-dd hh:mm:ss')
          )
        }
      },
      {
        align: 'center',
        editable: true,
        title: '订单号',
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
        editable: true,
        title: '合同生效日期',
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
        title: '备注',
        key: 'remitRemark'
      }
    ]
  }

  openSearch() {
    this.searchOptions = !this.searchOptions
  }

  repaySum(row) {}

  trailerCar(row) {}

  /**
   * 查看凭证
   */
  checkProof(row) {}

  getFrozenList() {
    this.frozenModel.applyDateStart = FilterService.dateFormat(
      this.frozenModel.applyDateStart,
      'yyyy-MM-dd'
    )
    this.frozenModel.applyDateEnd = FilterService.dateFormat(
      this.frozenModel.applyDateEnd,
      'yyyy-MM-dd'
    )
    this.remitApplicationService
      .selectApplyForReliefHistory(this.frozenModel, this.pageService)
      .subscribe(
        data => {
          this.frozenList = data
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }

  checkOrderInfo(row) {
    this.purchaseInfoModal = true
    let _purchaseInfo: any = this.$refs['purchase-info']
    _purchaseInfo.getOrderDetail(row)
  }

  /**
   * 解冻
   */
  unFrozen(row) {
    this.remitApplicationService
      .freezeCancel({
        applyId: row.applyId
      })
      .subscribe(
        val => {
          this.$Message.success('解冻成功！')
          this.getFrozenList()
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }

  getTimeSearch(val) {
    this.frozenModel.applyDateStart = ''
    this.frozenModel.applyDateEnd = ''
    this.frozenModel.collectMoneyMethod = ''
    this.frozenModel.orderInfo = ''
    this.frozenModel.timeSearch = val
    this.getFrozenList()
    this.frozenModel.timeSearch = ''
  }
}
</script>
<style lang="less" scoped>
.page.frozen-apply-record {
  .seek-day {
    margin-top: 10px;
  }
  .open-search {
    color: #265ea2;
  }
  .command {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    .command-item {
      font-size: 16px;
      cursor: pointer;
      display: inline-block;
      margin-left: 10px;
      color: #3367a7;
      .daochu {
        font-size: 12px;
      }
    }
  }
  .data-form {
    margin: 6px;
    position: relative;
    right: 6px;
    .data-form-item {
      &.search-input {
        display: inline-block;
        width: 14%;
        margin-left: 10px;
      }
      &.date {
        margin-left: 10px;
      }
      &.date-picker {
        display: inline-block;
        width: 10%;
      }
      &.collect {
        width: 10%;
        margin-left: 10px;
      }
      &.search-button {
        margin-left: 20px;
      }
    }
  }
}
</style>
