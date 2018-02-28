<!--划扣记录-->
<template>
  <section class="component deduct-record-has-search">
    <span>支付日期：</span>
    <i-date-picker type="date" style="display:inline-block;width:10%" v-model="customerRepayModel.startTime"></i-date-picker>~
    <i-date-picker type="date" style="display:inline-block;width:10%" v-model="customerRepayModel.endTime"></i-date-picker>
    <span style="margin-left:10px;">期数：</span>
    <i-input style="width:10%;display:inline-block" v-model="customerRepayModel.periods"></i-input>
    <i-select placeholder="全部交易状态" style="width:14%;display:inline-block;margin-left:10px;" v-model="customerRepayModel.dealStatus" clearable>
        <i-option v-for="{value,label} in $dict.getDictData('0115')" :key="value" :label="label" :value="value"></i-option>
    </i-select>
    <i-button class="blueButton" @click="query">搜索</i-button>
    <div style="float:right;margin-right:10px;margin-top:10px;">
      <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
        <svg-icon iconClass="daochu"></svg-icon>
        <span style="font-size: 12px;">导出</span>
      </div>
    </div>
    <div style="line-height:40px;font-size:14px;height:40px"><span>客户姓名：{{customerRepayObj.customerName}}</span><span style="float:right;">出账客户号：{{customerRepayObj.clientNumber}}</span></div>
    <i-table ref="table" class="i-table" :columns="columns1" :data="data1" stripe size="small"></i-table>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue";
  import SvgIcon from '~/components/common/svg-icon.vue'
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    FilterService
  } from "~/utils/filter.service"
  import {
    PaymentScheduleService
  } from "~/services/manage-service/payment-schedule.service";
  @Component({
    components: {
      DataBox,
      SvgIcon
    }
  })
  export default class DeductRecordHasSearch extends Vue {
    @Dependencies(PaymentScheduleService) private paymentScheduleService: PaymentScheduleService;
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private customerRepayModel: any = {
      personalId:'',
      orderId: '',
      startDate: '',
      endDate: '',
      periods: '',
      dealStatus: ''
    };
    private customerRepayObj: any = {
      customerName: '',
      clientNumber: '',
    };
    private data1: Array < Object >= [];
    refresh(row) {
      this.customerRepayModel = {
        personalId: row.personalId,
        orderId: row.orderId,
        startDate: '',
        endDate: '',
        periods: '',
        dealStatus: ''
      }
      this.customerRepayObj.customerName = ''
      this.customerRepayObj.clientNumber = ''
      this.data1 = []
      this.query()
    }
    query() {
      this.paymentScheduleService.getCustomerDeductionRecord(this.customerRepayModel).subscribe(data => {
        this.customerRepayObj.customerName = data.customerName
        this.customerRepayObj.clientNumber = data.clientNumber
        this.data1 = data.deductionRecordDetailModels
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    created() {
      this.columns1 = [{
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '期数',
          key: 'periods',
          width: 70,
          align: 'center'
        },
        {
          title: '支付日期',
          width: 120,
          key: 'actualCollectDate',
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.actualCollectDate, 'yyyy-MM-dd'))
          }
        },
        {
          title: '出账卡号',
          width: 165,
          key: 'defrayCardNumber',
          align: 'center'
        },
        {
          title: '支付银行',
          key: 'defrayBank',
          align: 'center'
        },
        {
          title: '支付金额',
          key: 'collectMoneyAmount',
          align: 'center'
        },
        {
          title: '汇付交易订单号',
          width: 180,
          key: 'onlineDealNumber',
          align: 'center'
        },
        {
          title: '交易状态',
          key: 'dealStatus',
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.dealStatus));
          }
        },
        {
          title: '失败原因',
          key: 'failReason',
          align: 'center'
        },
        {
          title: '操作人',
          key: 'operatorName',
          align: 'center'
        }
      ]
    }

  }

</script>

<style>


</style>
