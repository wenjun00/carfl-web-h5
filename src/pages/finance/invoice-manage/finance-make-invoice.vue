<!--财务开票-->
<template> 
  <section class="page finance-make-invoice">
    <page-header title="财务开票" hiddenPrint hiddenExport>
      <i-button type="text" @click="allMakeModal">确认开票</i-button>
    </page-header>

    <data-form data-prop="timeSearch" :model="model" :page="pageService" @on-search="query">
      <template slot="input">
        <i-form-item label="客户姓名" prop="dynamicCondition">
          <i-input v-model="model.dynamicCondition" placeholder="请输入客户姓名"></i-input>
        </i-form-item>
        <i-form-item label="订单编号" prop="collectMoneyChannel">
          <i-input v-model="model.collectMoneyChannel" placeholder="请输入订单编号"></i-input>
        </i-form-item>
        <i-form-item label="开票状态" prop="invoicingStatus">
          <i-select v-model="model.invoicingStatus" placeholder="请选择开票状态">
            <i-option v-for="{value,label} in $dict.getDictData('0119')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="所属公司" prop="companyId">
          <i-select v-model="model.companyId" placeholder="请选择所属公司">
            <!-- <i-option v-for="{value,label} in $dict.getDictData('0001')" :key="value" :label="label" :value="value"></i-option> -->
          </i-select>
        </i-form-item>
        <i-form-item label="开票项目" prop="collectItem">
          <i-select v-model="model.collectItem" placeholder="请选择开票项目">
            <i-option v-for="{value,label} in $dict.getDictData('0113')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="收款日期" prop="dateRange">
          <i-date-picker v-model="model.dateRange" type="daterange"></i-date-picker>
        </i-form-item>
      </template>
    </data-form>


    <data-box :columns="columnsData" :data="dataSet" @on-selection-change="headSelect"  :page="pageService"></data-box>
    <template>
      <i-modal v-model="makeInvoiceModal" @on-visible-change="closeEmpty" title="确认开票" :width="700" class="confirmMakeInvoice">
        <confirm-make-invoice @close="close" ref="confirm-make-invoice"></confirm-make-invoice>
         <div slot="footer">
              <i-button size="large" type="ghost" class="Ghost" @click="makeInvoiceModal=false">取消</i-button>
              <i-button size="large" type="primary" @click="addedConfirm">确定</i-button>
          </div>
      </i-modal>
    </template>

    <template>
      <i-modal title="查看附件" v-model="checkAttachmentModal">
        <check-attachment ref="check-attachment"></check-attachment>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from '~/core/page'
  import Component from 'vue-class-component'
  import ConfirmRepayment from '~/components/finance-manage/confirm-repayment.vue'
  import DeductRecord from '~/components/finance-manage/deduct-record.vue'
  import RepayInfo from '~/components/finance-manage/repay-info.vue'
  import CheckAttachment from '~/components/finance-manage/check-attachment.vue'
  import ConfirmMakeInvoice from '~/components/finance-manage/confirm-make-invoice.vue'
  import {Tooltip} from 'iview'
  import {Dependencies} from '~/core/decorator'
  import {Layout} from '~/core/decorator'
  import {FinanceInvoiceService} from '~/services/manage-service/finance-invoice.service'
  import {PageService} from '~/utils/page.service'
  import { FilterService} from '~/utils/filter.service'


  @Layout('workspace')
  @Component({
    components: {
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
    private dataSet: Array < any > = []
    private searchOptions: Boolean = false
    private openColumnsConfig: Boolean = false
    private makeInvoiceModal: Boolean = false
    private checkAttachmentModal: Boolean = false
    private makeId: any = [] // 开票数组       
    private makeMoney: Number = 0 // 开票金额

    private model: any = {
      dynamicCondition: '', // 客户姓名
      invoicingStatus: '', // 开票状态
      companyId: '', // 所属公司
      collectItem: '', // 开票项目
      collectMoneyChannel: '', // 订单编号
      startDate: '', // 起始日期
      endDate: '', // 结束日期
      dateRange: [] // 日期
    }
    private columnsData: any = [{
        align: 'center',
        type: 'selection',
        width: 40,
        fixed: 'left'
      },
      {
        title: '操作',
        minWidth: this.$common.getColumnWidth(8),
        align: 'center',
        fixed: 'left',
        render: (h, {
          row,
          column,
          index
        }) => {
          // 190 未开票 //191 已开票  // 192 开票撤销
          if (row.invoicingStatus == '190' || row.invoicingStatus== null ) {
             return h('div', [
              h(
                'i-button', {
                  props: {
                    type: 'text'
                  },
                  on: {
                    click: () => {
                      this.confirmMakeInvoicePop(row)
                    }
                  },
                  style: {
                    color: '#265EA2'
                  }
                },
                '确认开票'
              ),
              h(
                'i-button', {
                  props: {
                    type: 'text'
                  },
                  style: {
                    color: '#265EA2'
                  },
                  on: {
                    click: () => {
                      this.paymentDetails()
                    }
                  },
                },
                '收款详情'
              )
            ])
          } else {
              return h('div', [
              h(
                'i-button', {
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
                'i-button', {
                  props: {
                    type: 'text'
                  },
                  style: {
                    color: '#265EA2'
                  },
                  on: {
                    click: () => {
                      this.paymentDetails()
                    }
                  },
                },
                '收款详情'
              )
            ])
          }


        }
      },
      {
        align: 'center',
        title: '订单编号',
        key: 'orderNumber',
        minWidth: this.$common.getColumnWidth(8)
      },
      {
        title: '收款日期',
        key: 'actualCollectDate',
        sortable: true,
        align: 'center',
        minWidth: this.$common.getColumnWidth(6),
        render: (h, {
          row,
          column,
          index
        }) => {
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
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: 'center',
        title: '开票项目',
        key: 'collectItem',
        minWidth: this.$common.getColumnWidth(5),
        render: (h, {
          row,
          column,
          index
        }) => {
          return h('span', {}, this.$dict.getDictName(row.collectItem))
        }
      },
      {
        align: 'center',
        title: '金额',
        key: 'collectMoneyAmount',
        minWidth: this.$common.getColumnWidth(5),
        render: (h, {
          row
        }) => {
          return h(
            'div', {
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
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: 'center',
        title: '所属公司',
        key: 'companyChinaName',
        minWidth: this.$common.getColumnWidth(6)
      },
      {
        align: 'center',
        title: '结算通道',
        minWidth: this.$common.getColumnWidth(6),
        key: 'colectMoneyChannel',
        render: (h, {
          row,
          column,
          index
        }) => {
          return h('span', {}, this.$dict.getDictName(row.colectMoneyChannel))
        }
      },
      {
        align: 'center',
        title: '开票状态',
        sortable: true,
        minWidth: this.$common.getColumnWidth(5),
        key: 'invoicingStatus',
        render: (h, {
          row,
          column,
          index
        }) => {
          return h('span', {}, this.$dict.getDictName(row.invoicingStatus))
        }
      },
      {
        align: 'center',
        title: '发票号',
        key: 'invoiceNumber',
        minWidth: this.$common.getColumnWidth(6)
      },
      {
        align: 'center',
        title: '开票日期',
        minWidth: this.$common.getColumnWidth(5),
        key: 'invoicingDate',
        render: (h, {
          row,
          column,
          index
        }) => {
          return h(
            'span',
            FilterService.dateFormat(row.invoicingDate, 'yyyy-MM-dd')
          )
        }
      },
      {
        align: 'center',
        title: '发票抬头',
        minWidth: this.$common.getColumnWidth(6),
        key: 'invoicingTitle'
      },
      {
        align: 'center',
        title: '备注',
        key: 'remark',
        minWidth: this.$common.getColumnWidth(8)
      }
    ]
    /**
     * 财务开票头部选择
     */
    headSelect(val) {
      if(val.length){
        let arr = 0 
        let array = []
         for(let i in val){
          arr += Number(val[i].collectMoneyAmount)
          array.push(val[i].collectMoneyDetailId)
         }
        this.makeMoney = arr
        this.makeId = array
      }else{
        this.makeId = []
        this.makeMoney = 0
      }
     
    }
    /**
     * 多选确认开票
     */
    allMakeModal(){
      this.makeInvoiceModal = true
      let allMakeModal = this.$refs['confirm-make-invoice'] as ConfirmMakeInvoice
      allMakeModal.allMakeInvoice(this.makeId, this.makeMoney)
    }


    /**
     * 获取财务开票列表
     */
    query() {
      this.financeInvoiceService
        .getFinanceInvoiceList(this.model, this.pageService)
        .subscribe(
          val => {
            this.dataSet = val
          },
          ({
            msg
          }) => {
            this.$Message.error(msg)
          }
        )
    }

    openSearch() {
      this.searchOptions = !this.searchOptions
    }
    /**
     * 关闭弹窗数据清空
     */
    closeEmpty(val){
       if (!val) {
        let closeEmpty = this.$refs["confirm-make-invoice"] as ConfirmMakeInvoice;
        closeEmpty.allCloseEmpty()
      }
    }
 

    /**
     * 确认开票弹窗
     */
    confirmMakeInvoicePop(val) {
      this.makeInvoiceModal = true
      let makeInvoiceModal = this.$refs['confirm-make-invoice'] as ConfirmMakeInvoice
      makeInvoiceModal.saveMake(val.collectMoneyDetailId,val.collectMoneyAmount)
    }
    /**
     * 单个确定开票确定
     */
    addedConfirm(){
      let makeInvoiceModal = this.$refs['confirm-make-invoice'] as ConfirmMakeInvoice
      makeInvoiceModal.makeInvoice()
    }
   /**
   * 新增取消
   */
  close() {
    this.makeInvoiceModal = false
    this.query()
  }


    /**
     * 收款详情
     */
    paymentDetails() {

    }



    columnsConfig() {
      this.openColumnsConfig = true
    }
    /**
     * 确定
     */
    confirm() {}
    /**
     * 查看附件
     */
    checkAttachment(row) {
      this.checkAttachmentModal = true
      let checkAttachmentModal = this.$refs['check-attachment'] as CheckAttachment
      checkAttachmentModal.checkAccessory(row.collectMoneyDetailId)

    }
    /**
     * 切换触发
     */
    activated() {
      this.query()
    }

    mounted() {
      this.query()
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
