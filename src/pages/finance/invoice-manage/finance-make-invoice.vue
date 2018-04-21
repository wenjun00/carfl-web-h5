<!--财务开票-->
<template>
  <section class="page finance-make-invoice">
    <page-header title="财务开票" hiddenPrint hiddenExport></page-header>
    <data-form :model="model" hiddenDateSearch hidden-reset :page="pageService">
      <template slot="input">
        <i-form-item label="关键字：" prop="dynamicCondition">
          <i-input placeholder="客户姓名\发票号" v-model="model.dynamicCondition"></i-input>
        </i-form-item>
        <i-form-item prop="invoicingStatus">
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
    <data-box :columns="columns1" :data="data1" :page="pageService"></data-box>
    <div class="submitBar">
      <i-row type="flex" align="middle">
        <i-col :span="8" push="1">
          <span>申请人：administrator</span>
        </i-col>
        <i-col :span="10" pull="4">
          <span>申请时间： 2017-12-01 13:56:45</span>
        </i-col>
        <i-col :span="6" class="bottom">
          <!--<i-button @click="oneKeyToConnect" class="highButton">一键交接</i-button>-->
          <i-button class="highButton" @click="confirmMakeInvoice">确认开票</i-button>
        </i-col>
      </i-row>
    </div>

    <template>
      <i-modal v-model="makeInvoiceModal" title="确认开票" width="600" class="confirmMakeInvoice">
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
  import DataBox from "~/components/common/data-box.vue";
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import ConfirmRepayment from "~/components/finance-manage/confirm-repayment.vue";
  import DeductRecord from "~/components/finance-manage/deduct-record.vue";
  import RepayInfo from "~/components/finance-manage/repay-info.vue";
  import CheckAttachment from '~/components/finance-manage/check-attachment.vue'
  import ConfirmMakeInvoice from '~/components/finance-manage/confirm-make-invoice.vue'
  import {
    Tooltip
  } from 'iview'
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    Layout
  } from "~/core/decorator";
  import {
    FinanceInvoiceService
  } from "~/services/manage-service/finance-invoice.service";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    FilterService
  } from "~/utils/filter.service"

  @Layout("workspace")
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
    @Dependencies(FinanceInvoiceService) private financeInvoiceService: FinanceInvoiceService;
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private data1: any = [];
    private searchOptions: Boolean = false;
    private openColumnsConfig: Boolean = false;
    private makeInvoiceModal: Boolean = false;
    private checkAttachmentModal: Boolean = false;
    private model: any = {
      dynamicCondition: '',
      invoicingStatus: '',
      companyId: '',
      collectItem: '',
      collectMoneyChannel: '',
      startDate: '',
      endDate: '',
      dateRange:[]
    };

    query() {
      this.financeInvoiceService.getFinanceInvoiceList(this.model, this.pageService).subscribe(val => {
        this.data1 = val
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }

    openSearch() {
      this.searchOptions = !this.searchOptions;
    }

    /**
     * 确认开票
     */
    confirmMakeInvoice() {
      this.makeInvoiceModal = true
    }

    created() {
      this.query()
      this.columns1 = [{
          align: "center",
          type: "selection",
          width: 30,
          fixed: 'left'
        },
        {
          title: "操作",
          width: 120,
          align: "center",
          fixed: 'left',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('div', [
              h('i-button', {
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
              }, '查看附件'),
              h('i-button', {
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
              }, '撤销')
            ])
          }
        },
        {
          title: "付款日期",
          key: "actualCollectDate",
          align: "center",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.actualCollectDate, 'yyyy-MM-dd'))
          }
        },
        {
          align: "center",
          title: "客户姓名",
          key: "customerName"
        },
        {
          align: "center",
          title: "项目",
          key: "collectItem",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.collectItem));
          }
        },
        {
          align: "center",
          title: "金额",
          key: "collectMoneyAmount"
        },
        {
          align: "center",
          title: "期数",
          key: "periods"
        },
        {
          align: "center",
          title: "所属公司",
          key: "companyChinaName"
        },
        {
          align: "center",
          title: "结算通道",
          key: "colectMoneyChannel",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.colectMoneyChannel));
          }
        },
        {
          align: "center",
          title: "开票状态",
          key: "invoicingStatus",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.invoicingStatus));
          }
        },
        {
          align: "center",
          title: "发票号",
          key: "invoiceNumber"
        },
        {
          align: "center",
          title: "开票日期",
          key: "invoicingDate",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.invoicingDate, 'yyyy-MM-dd'))
          }
        },
        {
          align: "center",
          title: "发票抬头",
          key: "invoicingTitle"
        },
        {
          align: "center",
          title: "备注",
          key: "remark"
        }
      ];
    }
    columnsConfig() {
      this.openColumnsConfig = true;
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
    }
  }

</script>

<style lang="less">
  .page.finance-make-invoice {
    .title {
      margin-left: 10px
    }
    .form-input {
      display: inline-block;
      width: 10%
    }
    .form-select {
      margin-left: 10px;
      width: 10%
    }
    .form-button {
      margin-left: 10px;
      color: #265EA2
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
