<!--放款-->
<template>
  <section class="page payment">
    <page-header title="放款"></page-header>
    <data-form data-prop="timeSearch" hidden-reset :model="approvalModel" :page="pageService" @on-search="getOrderQuery">
      <template slot="input">
         <!-- <i-form-item prop="refundName" label="付款账户">
          <i-input v-model="approvalModel.refundName" placeholder="请录入付款账户名查询"></i-input>
        </i-form-item>
        <i-form-item prop="dateRange" label="日期：">
          <i-date-picker v-model="approvalModel.dateRange" type="daterange" placeholder="请选择日期范围"></i-date-picker>
        </i-form-item> -->
         <i-form-item prop="accountName" label="放款账户名">
          <i-input v-model="approvalModel.refundName" class="form-input" placeholder="请录入收款账户名查询"></i-input>
        </i-form-item>
        <i-form-item prop="orderNumber" label="订单编号">
          <i-input v-model="approvalModel.orderNumber" class="form-input" placeholder="请录入收款账户名查询"></i-input>
        </i-form-item>
        <i-form-item prop="dateRange" label="处理日期">
          <i-date-picker v-model="approvalModel.dateRange" class="title-item" type="daterange" placeholder="请选择日期范围"></i-date-picker>
        </i-form-item>
      </template>
    </data-form>
    <data-box :id="405" :columns="columns1" :data="paymentData" @onPageChange="getOrderQuery" :page="pageService"></data-box>

    <template>
      <i-modal v-model="confirmGatherModal" :title="checkGatherModal?'查看':'确认放款'" :width="900" class="confirmGather" :transfer="false">
        <confirm-pay ref="confirm-pay" :check="checkGatherModal"></confirm-pay>
        <div slot="footer">
          <i-button class="highButton" @click="sendBack" v-if="!checkGatherModal">退回</i-button>
          <i-button class="highButton" @click="confirmRepayment" v-if="!checkGatherModal">确认</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import DataBox from "~/components/common/data-box.vue";
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import ConfirmPay from "~/components/finance-manage/confirm-pay.vue"
  import SvgIcon from '~/components/common/svg-icon.vue';
  import {
    Tooltip
  } from 'iview'
  import {
    FilterService
  } from "~/utils/filter.service";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    RefundApplicationService
  } from "~/services/manage-service/refund-application.service";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({

    components: {
      SvgIcon,
      DataBox,
      ConfirmPay
    }
  })
  export default class Payment extends Page {
    @Dependencies(RefundApplicationService) private refundApplicationService: RefundApplicationService;
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private paymentData: Array < Object > = [];
    private searchOptions: Boolean = false;
    private refundName: String = '';
    private confirmGatherModal: Boolean = false;
    private checkGatherModal: Boolean = false;
    private startTime: any;
    private endTime: any;
    private approvalModel: any = {
      orderNumber:'',
      refundName: '',
      timeSearch: '',
      startTime: '',
      endTime: '',
      approvalStatus: 1127,
      dateRange:[]
    }
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    sendBack() {
      let _repayment: any = this.$refs['confirm-pay']
      this.refundApplicationService.returnRefundApplication({
        refundId: _repayment.rowObj.refundApplicationId
      }).subscribe(data => {
        this.$Message.info('操作成功！')
        this.confirmGatherModal = false
        this.pageService.reset()
        this.getOrderQuery()
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    confirmRepayment() {
      let _repayment: any = this.$refs['confirm-pay']
      let data: any = {}
      // data.financeUploadResources = _repayment.financeUploadResources
      // data.refundRecordItems = _repayment.collectMoneyDetails
      // data.orderId = _repayment.rowObj.orderId
      // data.businessId = _repayment.rowObj.businessId
      data.id = _repayment.rowObj.refundApplicationId
      data.resourceList  = _repayment.fodderList
      data.settlementChannel = _repayment.pipeSelect
      // data.recordStatus = 1129
      this.refundApplicationService.comfireRefund(data).subscribe(data => {
        this.$Message.info('操作成功！')
        this.confirmGatherModal = false
        this.pageService.reset()
        this.getOrderQuery()
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    saveDraft() {
      let _repayment: any = this.$refs['confirm-pay']
      let data: any = {}
      data.financeUploadResources = _repayment.financeUploadResources
      data.refundRecordItems = _repayment.collectMoneyDetails
      data.orderId = _repayment.rowObj.orderId
      data.businessId = _repayment.rowObj.businessId
      data.id = _repayment.rowObj.refundApplicationId
      data.recordStatus = 1128
      this.refundApplicationService.comfireRefund(data).subscribe(data => {
        this.$Message.info('保存草稿成功！')
        this.confirmGatherModal = false
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    getOrderQuery() {
      this.refundApplicationService.getRefundRecord(this.approvalModel, this.pageService).subscribe(
        val =>this.paymentData = val,
        err => this.$Message.error(err)
      )
    }
    getTimeSearch(val) {
      this.approvalModel.startTime = "";
      this.approvalModel.endTime = "";
      this.approvalModel.timeSearch = val;
      this.getOrderQuery();
      this.approvalModel.timeSearch = "";
    }
    created() {
      this.getOrderQuery()
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
            if (row.processStatus === 1132) {
              return h("div", [
                h(
                  "i-button", {
                    props: {
                      type: "text"
                    },
                    style: {
                      color: "#265EA2"
                    },
                    on: {
                      click: () => {
                        let _repayment: any = this.$refs['confirm-pay']
                        _repayment.refresh(row)
                        this.checkGatherModal = false
                        this.confirmGatherModal = true
                      }
                    }
                  },
                  "确认放款"
                )
              ]);
            } else if (row.processStatus === 1131) {
              return h("div", [
                h(
                  "i-button", {
                    props: {
                      type: "text"
                    },
                    style: {
                      color: "#265EA2"
                    },
                    on: {
                      click: () => {
                        let _repayment: any = this.$refs['confirm-pay']
                        _repayment.refresh(row)
                        this.confirmGatherModal = true
                        this.checkGatherModal = true
                      }
                    }
                  },
                  "查看"
                )
              ]);
            }
          }
        },
        {
          title: '处理状态',
          key: 'processStatus',
          editable: true,
          align: 'center',
          minWidth: this.$common.getColumnWidth(3),
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.processStatus));
          }
        }, {
          title: '处理时间',
          key: 'processTime',
          editable: true,
          minWidth: this.$common.getColumnWidth(6),
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.processTime, 'yyyy-MM-dd hh:mm:ss'))
          }
        }, {
          title: '处理人',
          editable: true,
          minWidth: this.$common.getColumnWidth(3),
          key: 'processName',
          align: 'center'
        }, {
          title: '付款类型',
          key: 'refundType',
          editable: true,
          minWidth: this.$common.getColumnWidth(3),
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.refundType));
          }
        }, {
          title: '付款总金额',
          key: 'refundTotalAmount',
          editable: true,
          align: 'center',
          minWidth: this.$common.getColumnWidth(4),
          render: (h, { row }) => {
            return h(
              "div",
              {
                style: {
                  textAlign: "right"
                }
              },
              this.$filter.toThousands(row.refundTotalAmount)
            );
          }
        }, {
          title: '付款账户名',
          key: 'customerName',
          editable: true,
          align: 'center',
          minWidth: this.$common.getColumnWidth(3),
        }, {
          title: '申请日期',
          key: 'operateTime',
          editable: true,
          minWidth: this.$common.getColumnWidth(6),
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.operateTime, 'yyyy-MM-dd hh:mm:ss'))
          }
        }, {
          title: '制单人',
          key: 'operator',
          editable: true,
          align: 'center',
          minWidth: this.$common.getColumnWidth(3),
        }
      ]
    }
    /**
     * 确定
     */
    confirm() {}
  }

</script>

<style lang="less">
  .page.payment {
    .data-form {
      margin-top: 10px;
    }
    .form-button {
      color: #265EA2
    }
    .importBtn {
      float: right;
      margin-right: 13px;
      margin-top: 10px;
      .importBtn-item {
        cursor: pointer;
        display: inline-block;
        margin-left: 10px;
        color: #3367A7;
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
      .form-input {
        display: inline-block;
        width: 18%;
        margin-left: 20px;
      }
      .title {
        margin-left: 10px;
      }
      .title-item {
        display: inline-block;
        width: 10%
      }
    }
  }

  .confirmGather {
    .ivu-modal-body {
      height: 600px;
      overflow: auto;
    }
  }

</style>
