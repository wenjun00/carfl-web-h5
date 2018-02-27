<!--划扣记录-->
<template>
  <section class="component repay-record">
    <div style="line-height:40px;font-size:14px;height:40px"><span>客户姓名：{{repayObj.customerName}}</span><span style="float:right;">出账客户号：{{repayObj.clientNumber}}</span></div>
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
      orderNumber: ''
    };
    private columns1: any;
    private data1: Array < Object >= [];
    refresh(orderId) {
      this.paymentScheduleService.getPaymentScheduleDetail({
        orderId: orderId
      }).subscribe(data => {
        this.repayObj.customerName = data.customerName
        this.repayObj.orderNumber = data.orderNumber
        this.data1 = data.paymentDetails
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    created() {
      this.columns1 = [{
          title: '期数',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '还款日期',
          width: 120,
          key: 'payDate',
          align: 'center'
        },
        {
          title: '还款渠道',
          width: 165,
          key: 'payChannel',
          align: 'center'
        },
        {
          title: '还款方式',
          key: 'payWay',
          align: 'center'
        },
        {
          title: '还款金额',
          key: 'payAmt',
          align: 'center'
        },
        {
          title: '汇付交易订单号',
          width: 180,
          key: 'huifuId',
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
          key: 'operator',
          align: 'center'
        }
      ]

      this.data1 = [{
        periods: '1期',
        payChannel: '汇付',
        payDate: '2017-12-01',
        outAccountId: '6227001454452014325',
        payBank: '建行',
        payAmt: '1500.00',
        huifuId: 'QC000000000000002155',
        dealStatus: '成功',
        failReason: '',
        operator: '胡开甲'
      }, {
        payChannel: '汇付',
        periods: '2期',
        payDate: '2017-12-01',
        outAccountId: '6227001454452014325',
        payBank: '建行',
        payAmt: '1500.00',
        huifuId: 'QC000000000000002155',
        dealStatus: '成功',
        failReason: '',
        operator: '胡开甲'
      }, {
        periods: '3期',
        payChannel: '汇付',
        payDate: '2017-12-01',
        outAccountId: '6227001454452014325',
        payBank: '建行',
        payAmt: '1500.00',
        huifuId: 'QC000000000000002155',
        dealStatus: '成功',
        failReason: '',
        operator: '胡开甲'
      }, {
        periods: '4期',
        payDate: '2017-12-01',
        outAccountId: '6227001454452014325',
        payBank: '建行',
        payAmt: '1500.00',
        payChannel: '支付宝',
        huifuId: '',
        dealStatus: '成功',
        failReason: '',
        operator: '胡开甲'
      }, {
        periods: '5期',
        payDate: '2017-12-01',
        outAccountId: '6227001454452014325',
        payBank: '建行',
        payChannel: '微信',
        payAmt: '1500.00',
        huifuId: '',
        dealStatus: '成功',
        failReason: '',
        operator: '胡开甲'
      }]
    }

  }

</script>

<style>


</style>
