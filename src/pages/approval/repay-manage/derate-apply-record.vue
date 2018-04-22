<!--减免申请记录-->
<template>
    <section class="page derate-apply-record">
        <page-header title="减免申请记录" hiddenPrint></page-header>
        <data-form date-prop="timeSearch" :model="derateModel" @on-search="getDerateList" :page="pageService"  hidden-reset>
            <template slot="input">
                    <i-form-item prop="orderInfo">
                        <i-input v-model="derateModel.orderInfo" placeholder="请录入客户姓名\证件号码\订单号\手机号查询"></i-input>
                    </i-form-item>
                    <i-form-item prop="dateRange" label="日期：">
                        <i-date-picker v-model="derateModel.dateRange"  placeholder="请选择日期范围"></i-date-picker>
                    </i-form-item>
                    <i-form-item prop="collectMoneyMethod" label="结算通道">
                        <i-select placeholder="请选择结算通道" v-model="derateModel.collectMoneyMethod" clearable>
                            <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
                        </i-select>
                    </i-form-item>
                </template>

        </data-form>

        <data-box :id="340" :columns="columns1" :data="derateList" :page="pageService" @onPageChange="getDerateList"></data-box>

        <template>
            <i-modal title="订单详情" :width="1200" v-model="purchaseInfoModal" class="purchaseInformation">
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
import { RemitApplicationService } from '~/services/manage-service/remit-application.service'
import { Layout } from '~/core/decorator'
import { PageService } from '~/utils/page.service'
import { FilterService } from '~/utils/filter.service'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    RepaySum,
    SvgIcon,
    PurchaseInformation
  }
})
export default class DerateApplyRecord extends Page {
  @Dependencies(RemitApplicationService)
  private remitApplicationService: RemitApplicationService
  @Dependencies(PageService) private pageService: PageService
  private columns1: any
  private derateList: Array<any> = []
  private repayInfo: Boolean = false
  private purchaseInfoModal: Boolean = false
  private searchOptions: Boolean = false
  private derateModel: any = {
    remitItem: 1121,
    applyDateStart: '',
    applyDateEnd: '',
    timeSearch: '',
    collectMoneyMethod: '',
    orderInfo: '',
    dateRange:[]
  }

  mounted() {
    this.getDerateList()
  }

  created() {
    this.columns1 = [
      {
        title: '操作',
        minWidth: this.$common.getColumnWidth(4),
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
                      content: '确定撤销吗？',
                      onOk: () => {
                        this.revertDerate(row)
                      }
                    })
                  }
                }
              },
              '撤销'
            )
          ])
        }
      },
      {
        align: 'center',
        editable: true,
        title: '减免金额',
        key: 'remitAmount',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => {
          return h(
            "div",
            {
              style: {
                textAlign: "right"
              }
            },
            this.$filter.toThousands(row.remitAmount)
          );
        }

      },
      {
        align: 'center',
        editable: true,
        title: '减免期数',
        key: 'periods',
        minWidth: this.$common.getColumnWidth(2),
      },
      {
        align: 'center',
        editable: true,
        title: '订单环节',
        key: 'orderLink',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, column, index }) => {
          return h('span', {}, this.$dict.getDictName(row.orderLink))
        }
      },
      {
        align: 'center',
        editable: true,
        title: '订单状态',
        key: 'orderStatus',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, column, index }) => {
          return h('span', {}, this.$dict.getDictName(row.orderStatus))
        }
      },
      {
        align: 'center',
        title: ' 申请时间',
        editable: true,
        key: 'applyDate',
        minWidth: this.$common.getColumnWidth(5),
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
        key: 'name',
        minWidth: this.$common.getColumnWidth(3),
      },
      {
        align: 'center',
        editable: true,
        title: ' 证件号码',
        key: 'idCard',
        minWidth: this.$common.getColumnWidth(6)
      },
      {
        align: 'center',
        title: ' 手机号',
        editable: true,
        key: 'mobileNumber',
        minWidth: this.$common.getColumnWidth(5)
      },
      {
        align: 'center',
        title: ' 订单创建时间',
        editable: true,
        key: 'orderCreateTime',
        minWidth: this.$common.getColumnWidth(6),
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
        title: ' 订单号',
        key: 'orderNumber',
        minWidth: this.$common.getColumnWidth(6),
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
        title: ' 合同生效日期',
        editable: true,
        key: 'contractDate',
        minWidth: this.$common.getColumnWidth(6),
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
        title: ' 备注',
        key: 'remitRemark',
        minWidth: this.$common.getColumnWidth(6)
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

  checkOrderInfo(row) {
    this.purchaseInfoModal = true
    let _purchaseInfo: any = this.$refs['purchase-info']
    _purchaseInfo.getOrderDetail(row)
  }

  getDerateList() {
    this.remitApplicationService
      .selectApplyForReliefHistory(this.derateModel, this.pageService)
      .subscribe(
        data =>this.derateList = data,
        err => this.$Message.error(err)
      )
  }

  /**
   * 撤销
   */
  revertDerate(row) {
    this.remitApplicationService
      .remitCanceled({
        applyId: row.applyId
      })
      .subscribe(
        val => {
          this.$Message.success('撤销成功！')
          this.getDerateList()
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }

  getTimeSearch(val) {
    this.derateModel.applyDateStart = ''
    this.derateModel.applyDateEnd = ''
    this.derateModel.collectMoneyMethod = ''
    this.derateModel.orderInfo = ''
    this.derateModel.timeSearch = val
    this.getDerateList()
    this.derateModel.timeSearch = ''
  }
}
</script>
<style lang="less" scoped>
.page.derate-apply-record {
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
