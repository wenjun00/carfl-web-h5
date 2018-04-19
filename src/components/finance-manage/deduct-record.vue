<!--划扣记录-->
<template>
  <section class="component deduct-record">
    <div class="modal-item"><span>客户姓名：{{customerRepayObj.customerName}}</span>
      <span style="float:right;">出账客户号：{{customerRepayObj.clientNumber}}</span>
    </div>
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
  export default class DeductRecord extends Vue {
    @Dependencies(PaymentScheduleService) private paymentScheduleService: PaymentScheduleService;
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private customerRepayModel: any = {

    };
    private customerRepayObj: any = {
      customerName: '',
      clientNumber: ''
    };
    private data1: Array < Object >= [];
    refresh(row) {
      this.customerRepayObj.customerName = ''
      this.customerRepayObj.clientNumber = ''
      this.data1 = []
      this.paymentScheduleService.getPaymentRecordDetail(row).subscribe(data => {
        this.customerRepayObj.customerName = data.customerName
        this.customerRepayObj.clientNumber = data.clientNumber
        this.data1 = data.paymentRecordModels
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    created() {
      this.columns1 = [
        {
          title: '期数',
          key: 'periods',
          width: 70,
          align: 'center'
        },
        {
          title: '还款日期',
          width: 100,
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
          title: '还款渠道',
          width: 165,
          key: 'collectMoneyChannel',
          align: 'center',
          render: (h, { row, column, index }) => {
            return h("span", {}, this.$dict.getDictName(row.collectMoneyChannel));
          }
        },
        {
          title: '还款方式',
          key: 'collectMoneyMethod',
          align: 'center',
          render: (h, { row, column, index }) => {
            return h("span", {}, this.$dict.getDictName(row.collectMoneyMethod));
          }
        },
        {
          title: '还款金额',
          key: 'actualCollectSum',
          align: 'center'
        },
        {
          title: '汇付交易订单号',
          width: 180,
          key: 'onlineDealNumber',
          align: 'center'
        },
        {
          title: '操作人',
          key: 'userName',
          align: 'center'
        },
        {
          title: '失败原因',
          key: 'failReason',
          align: 'center'
        },
      ]
    }

  }

</script>

<style lang="less" scoped>
  .component.deduct-record{
    .modal-item{
      line-height:40px;font-size:14px;height:40px
    }
  }


</style>
