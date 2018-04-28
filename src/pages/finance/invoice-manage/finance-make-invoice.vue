<!--财务开票-->
<template>
  <section class="page finance-make-invoice">
    <page-header title="财务开票" hiddenPrint hiddenExport>
      <command-button label="确认开票" @click="confirmMakeInvoice"></command-button>
    </page-header>
    <data-form :model="model" hiddenDateSearch hidden-reset :page="pageService">
      <template slot="input">
        <i-form-item label="关键字：" prop="dynamicCondition">
          <i-input placeholder="客户姓名\发票号" v-model="model.dynamicCondition"></i-input>
        </i-form-item>
        <i-form-item prop="invoicingStatus" label="开票状态">
          <i-select placeholder="开票状态" v-model="model.invoicingStatus">
            <i-option label="已开票" value="已开票" key="已开票"></i-option>
            <i-option label="未开票" value="未开票" key="未开票"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="companyId" label="所属公司：">
          <i-select placeholder="全部机构" v-model="model.companyId">
            <i-option value="群泰上海" key="群泰上海" label="群泰上海"></i-option>
            <i-option value="群泰西安" key="群泰西安" label="群泰西安"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="collectItem" label="状态筛选：">
          <i-select placeholder="全部项目" v-model="model.collectItem">
            <i-option value="汇付" key="汇付" label="汇付"></i-option>
            <i-option value="富友" key="富友" label="富友"></i-option>
            <i-option value="支付宝" key="支付宝" label="支付宝"></i-option>
            <i-option value="现金" key="现金" label="现金"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="dateRange" label="付款日期：">
          <i-date-picker v-model="model.dateRange" type="daterange" placeholder="请选择日期范围"></i-date-picker>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="columns1" :data="data1" :page="pageService" @onPageChange="query"></data-box>
    <template>
      <i-modal v-model="makeInvoiceModal" title="确认开票" :width="600" class="confirmMakeInvoice">
        <confirm-make-invoice></confirm-make-invoice>
      </i-modal>
    </template>

    <template>
      <i-modal title="查看附件" v-model="checkAttachmentModal">
        <check-attachment></check-attachment>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import DataBox from '~/components/common/data-box.vue'
import Page from '~/core/page'
import Component from 'vue-class-component'
import ConfirmRepayment from '~/components/finance-manage/confirm-repayment.vue'
import DeductRecord from '~/components/finance-manage/deduct-record.vue'
import RepayInfo from '~/components/finance-manage/repay-info.vue'
import CheckAttachment from '~/components/finance-manage/check-attachment.vue'
import ConfirmMakeInvoice from '~/components/finance-manage/confirm-make-invoice.vue'
import { Tooltip } from 'iview'
import { Dependencies } from '~/core/decorator'
import { Layout } from '~/core/decorator'
import { FinanceInvoiceService } from '~/services/manage-service/finance-invoice.service'
import { PageService } from '~/utils/page.service'
import { FilterService } from '~/utils/filter.service'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    ConfirmRepayment,
    DeductRecord,
    RepayInfo,
    CheckAttachment,
    ConfirmMakeInvoice
  }
})
export default class FinanceMakeInvoice extends Page {
  @Dependencies(FinanceInvoiceService) private financeInvoiceService: FinanceInvoiceService
  @Dependencies(PageService) private pageService: PageService
  private columns1: any
  private data1: any = []
  private searchOptions: Boolean = false
  private openColumnsConfig: Boolean = false
  private makeInvoiceModal: Boolean = false
  private checkAttachmentModal: Boolean = false
  private model: any = {
    dynamicCondition: '',
    invoicingStatus: '',
    companyId: '',
    collectItem: '',
    collectMoneyChannel: '',
    startDate: '',
    endDate: '',
    dateRange: []
  }

  query() {
    this.financeInvoiceService
      .getFinanceInvoiceList(this.model, this.pageService)
      .subscribe(
      val => {
        this.data1 = val
      },
      ({ msg }) => {
        this.$Message.error(msg)
      }
      )
  }

  openSearch() {
    this.searchOptions = !this.searchOptions
  }

  /**
   * 确认开票
   */
  confirmMakeInvoice() {
    this.makeInvoiceModal = true
  }

  created() {
    this.query()
    this.columns1 = [
      {
        align: 'center',
        type: 'selection',
        width: 40,
        fixed: 'left'
      },
      {
        title: '操作',
        minWidth: this.$common.getColumnWidth(5),
        align: 'center',
        fixed: 'left',
        render: (h, { row, column, index }) => {
          return h('div', [
            h(
              'i-button',
              {
                props: {
                  type: 'text'
                },
                on: {
                  click: () => {
                    this.checkAttachment(row)
                  }
                },
                style: {
                  color: '#265EA2'
                }
              },
              '查看附件'
            ),
            h(
              'i-button',
              {
                props: {
                  type: 'text'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '提示',
                      content: '确定撤销吗？',
                      onOk: () => {
                        this.$Message.info('撤销成功！')
                      }
                    })
                  }
                },
                style: {
                  color: '#265EA2'
                }
              },
              '撤销'
            )
          ])
        }
      },
      {
        title: '付款日期',
        key: 'actualCollectDate',
        align: 'center',
        minWidth: this.$common.getColumnWidth(6),
        render: (h, { row, column, index }) => {
          return h(
            'span',
            FilterService.dateFormat(row.actualCollectDate, 'yyyy-MM-dd')
          )
        }
      },
      {
        align: 'center',
        title: '客户姓名',
        key: 'customerName',
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        align: 'center',
        title: '项目',
        key: 'collectItem',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, column, index }) => {
          return h('span', {}, this.$dict.getDictName(row.collectItem))
        }
      },
      {
        align: 'center',
        title: '金额',
        key: 'collectMoneyAmount',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => {
          return h(
            'div',
            {
              style: {
                textAlign: 'right'
              }
            },
            this.$filter.toThousands(row.collectMoneyAmount)
          )
        }
      },
      {
        align: 'center',
        title: '期数',
        key: 'periods',
        minWidth: this.$common.getColumnWidth(2)
      },
      {
        align: 'center',
        title: '所属公司',
        key: 'companyChinaName',
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        align: 'center',
        title: '结算通道',
        minWidth: this.$common.getColumnWidth(3),
        key: 'colectMoneyChannel',
        render: (h, { row, column, index }) => {
          return h('span', {}, this.$dict.getDictName(row.colectMoneyChannel))
        }
      },
      {
        align: 'center',
        title: '开票状态',
        minWidth: this.$common.getColumnWidth(2),
        key: 'invoicingStatus',
        render: (h, { row, column, index }) => {
          return h('span', {}, this.$dict.getDictName(row.invoicingStatus))
        }
      },
      {
        align: 'center',
        title: '发票号',
        key: 'invoiceNumber',
        minWidth: this.$common.getColumnWidth(5)
      },
      {
        align: 'center',
        title: '开票日期',
        minWidth: this.$common.getColumnWidth(5),
        key: 'invoicingDate',
        render: (h, { row, column, index }) => {
          return h(
            'span',
            FilterService.dateFormat(row.invoicingDate, 'yyyy-MM-dd')
          )
        }
      },
      {
        align: 'center',
        title: '发票抬头',
        minWidth: this.$common.getColumnWidth(4),
        key: 'invoicingTitle'
      },
      {
        align: 'center',
        title: '备注',
        key: 'remark',
        minWidth: this.$common.getColumnWidth(6)
      }
    ]
  }
  columnsConfig() {
    this.openColumnsConfig = true
  }
  /**
   * 确定
   */
  confirm() { }
  /**
   * 查看附件
   */
  checkAttachment(row) {
    this.checkAttachmentModal = true
  }
}
</script>

<style lang="less">
.page.finance-make-invoice {
  .fixed-container {
    height: 65px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 10;
    text-align: right;
    padding: 10px 20px;
    box-shadow: 0px -5px 10px #ccc;
  }
  .title {
    margin-left: 10px;
  }
  .form-input {
    display: inline-block;
    width: 10%;
  }
  .form-select {
    margin-left: 10px;
    width: 10%;
  }
  .form-button {
    margin-left: 10px;
    color: #265ea2;
  }
  .second-data {
    margin: 6px;
    .second-select {
      margin-left: 10px;
      width: 15%;
    }
    .second-picker {
      width: 10%;
    }
  }
}

.bottom {
  text-align: right;
  padding: 10px;
}
</style>
