<!--付款记录查询-->
<template>
  <section class="page payment-record-query">
    <page-header title="付款记录查询" hiddenPrint hiddenExport></page-header>
    <data-form hidden-date-search :model="paymentModel" :page="pageService" @on-search="searchPaymentrecord">
      <template slot="input">
        <i-form-item prop="dateRange" label="申请日期">
          <i-date-picker v-model="paymentModel.dateRange" type="daterange" placeholder="请选择日期范围"></i-date-picker>
        </i-form-item>
        <i-form-item prop="orderNumber" label="订单编号">
          <i-input placeholder="请录入订单编号" v-model="paymentModel.orderNumber"></i-input>
        </i-form-item>
        <i-form-item prop="refundType" label="付款类型">
          <i-select placeholder="全部付款类型" clearable v-model="paymentModel.refundType">
            <i-option v-for="{value,label} in $dict.getDictData('0430')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="applicationStatus" label="申请状态">
          <i-select placeholder="申请状态" clearable v-model="paymentModel.applicationStatus">
            <i-option v-for="{value,label} in $dict.getDictData('0415')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </template>
      <template slot="button">
        <i-checkbox class="command-item" v-model="status">包含已归档订单</i-checkbox>
      </template>
    </data-form>
    <data-box :id="455" :columns="columns1" :data="data1" :page="pageService" @onPageChange="searchPaymentrecord"></data-box>
    <!--Model-->

    <template>
      <i-modal v-model="checkApplyModal" title="查看" :width="800">
        <!--<add-apply></add-apply>-->
        <apply-detail ref="applyDetail"></apply-detail>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue";
  import PurchaseInformation from "~/components/purchase-manage/purchase-information.vue";
  import SvgIcon from '~/components/common/svg-icon.vue'
  // 添加新申请
  import AddApply from "~/components/purchase-manage/add-apply.vue";
  import {
    RefundApplicationService
  } from "~/services/manage-service/refund-application.service";
  import {
    Layout
  } from "~/core/decorator";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    FilterService
  } from "~/utils/filter.service";
  // 添加新申请
  import ApplyDetail from "~/components/purchase-manage/apply-detail.vue";

  @Layout("workspace")
  @Component({
    components: {
      DataBox,
      SvgIcon,
      AddApply,
      ApplyDetail
    }
  })
  export default class PaymentRecordQuery extends Page {
    @Dependencies(RefundApplicationService) private refundApplicationService: RefundApplicationService;
    @Dependencies(PageService) private pageService: PageService;

    private columns1: any;
    private data1: Array < Object > = [];
    private searchOptions: Boolean = false;
    private checkApplyModal: Boolean = false;
    private status: Boolean = false;
    private paymentModel: any = {
      orderNumber: '',
      startTime: '',
      endTime: '',
      refundType: '',
      applicationStatus: '', // 申请状态
      dateRange:[]
    }


    addNewApply() {
      this.$Modal.info({
        title: '新增申请',
        width: 800,
        render: h => h(AddApply)
      })
    }
    activated() {
      this.searchPaymentrecord()
    }
    created() {
      this.searchPaymentrecord()
      this.columns1 = [{
        title: '操作',
        align: 'center',
        fixed: 'left',
        minWidth: this.$common.getColumnWidth(5),
        render: (h, {
          row,
          columns,
          index
        }) => {
          return h('div', [
            h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  this.checkApplyModal = true
                  this.refundApplicationService.getRefundApplicationById({
                    refundId: row.refundApplicationId
                  }).subscribe(val => {
                    let _applyInfo: any = this.$refs['applyDetail']
                    _applyInfo.getparent(val)
                  })
                }
              },
              style: {
                color: '#265EA2'
              }
            }, '查看')
          ])
        }
      }, {
        title: '订单编号',
        key: 'orderNumber',
        align: 'center',
        editable: true,
        minWidth: this.$common.getColumnWidth(5),
      }, {
        title: '付款类型',
        key: 'refundType',
        align: 'center',
        editable: true,
        minWidth: this.$common.getColumnWidth(3),
        render: (h, {
          row,
          column,
          index
        }) => {
          return h("span", {}, this.$dict.getDictName(row.refundType));
        }
      }, {
        title: '申请状态',
        key: 'applicationStatus',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3),
        editable: true,
        render: (h, {
          row,
          column,
          index
        }) => {
          return h("span", {}, this.$dict.getDictName(row.applicationStatus));
        }
      }, {
        title: '付款客户名',
        key: 'customerName',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3),
        editable: true,
      }, {
        title: '付款金额',
        key: 'refundTotalAmount',
        align: 'center',
        editable: true,
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
        title: '申请时间',
        key: 'operateTime',
        align: 'center',
        editable: true,
        minWidth: this.$common.getColumnWidth(6),
        render: (h, {
          row,
          column,
          index
        }) => {
          return h('span', FilterService.dateFormat(row.processTime, 'yyyy-MM-dd hh:mm:ss'))
        }
      }, {
        title: '制单人',
        key: 'operator',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3),
        editable: true,
      }]
    }
    searchPaymentrecord() {
      if (this.status) {
        this.paymentModel.processStatus = ''
      } else {
        this.paymentModel.processStatus = 1130
      }
      this.refundApplicationService
        .getRefundRecord(this.paymentModel, this.pageService)
        .subscribe(
          data =>this.data1 = data,
          err=>this.$Message.error(err)
        );
    }
    getOrderInfoByTime() {}
    openSearch() {
      this.searchOptions = !this.searchOptions
    }

    /**
     * 多选
     */
    multipleSelect(selection) {}
    /**
     * 确定
     */
    confirm() {

    }
  }

</script>

<style lang="less" scoped>
  .page.payment-record-query {
    .title {
      margin-right: 10px;
    }
    .data-form {
      margin-top: 10px;
      margin-left: 10px;
      .data-form-item {
        display: inline-block;
        width: 10%;
        margin-right: 10px;
      }
    }
    .command-item {
      margin-left: 10px;
    }
  }

</style>
