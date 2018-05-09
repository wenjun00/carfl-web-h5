<!--划扣记录-->
<template>
  <section class="component repay-record">
    <div class="modal-item"><span>客户姓名：{{repayObj.customerName}}</span>
      <span class="modal-item-kehuhao">出账客户号：{{repayObj.clientNumber}}</span>
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
    PaymentScheduleService
  } from "~/services/manage-service/payment-schedule.service";
  import {
    FilterService
  } from "~/utils/filter.service"

  @Component({
    components: {
      DataBox,
      SvgIcon
    }
  })
  export default class RepayRecord extends Vue {
    @Dependencies(PaymentScheduleService) private paymentScheduleService: PaymentScheduleService;
    private repayObj: any = {
      customerName: '',
      clientNumber: ''
    };
    private columns1: any;
    private data1: Array<Object> = [];

    refresh(row, obj) {
      this.paymentScheduleService.getPaymentRecordDetail({
        personalId: row.personalId,
        businessId: obj.id,
        orderId: row.orderId
      }).subscribe(data => {
        this.repayObj.customerName = data.customerName
        this.repayObj.clientNumber = data.clientNumber
        this.data1 = data.paymentRecordModels
      }, ({
            msg
          }) => {
        this.$Message.error(msg)
      })
    }

    created() {
      this.columns1 = [{
        title: '期数',
        key: 'periods',
        width: 60,
        align: 'center'
      },
        {
          title: '还款日期',
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
          title: '还款渠道',
          width: 165,
          key: 'payChannel',
          align: 'center',
          render: (h, {row, column, index}) => {
            return h("span", {}, this.$dict.getDictName(row.collectMoneyChannel));
          }
        },
        {
          title: '还款方式',
          key: 'payWay',
          align: 'center',
          render: (h, {row, column, index}) => {
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
        // ,
        // {
        //   title: '交易状态',
        //   key: 'dealStatus',
        //   align: 'center'
        // },
        {
          title: '失败原因',
          key: 'failReason',
          align: 'center'
        },
        {
          title: '操作人',
          key: 'userName',
          align: 'center'
        }
      ]
    }

  }

</script>

<style lang="less" scoped>
  .component.repay-record {

    .modal-item {
      line-height: 40px;
      font-size: 14px;
      height: 40px
    }

    .modal-item-kehuhao {
      float: right;
    }

  }

</style>
