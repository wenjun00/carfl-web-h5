<!--还款详情-->
<template>
  <section class="component repay-info" >
    <data-box :columns="columns1" :data="data1"></data-box>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue";

  @Component({
    components: {
      DataBox
    }
  })
  export default class RepayInfo extends Vue {
    private columns1: any;
    private data1: Array < Object >= [];

    created() {
      this.columns1 = [{
          type: "index",
          title: '期数',
          fixed: 'left',
          align: 'center',
          width:60
        },
        {
          title: '还款状态',
          fixed: 'left',
          key: 'repayStatus',
          align: 'center',
          width:90
        },
        {
          title: '应付款日',
          fixed: 'left',
          key: 'shouldPayDate',
          align: 'center',
          width:120
        },
        {
          title: '实际付款日',
          fixed: 'left',
          key: 'actualPayDate',
          align: 'center',
          width:120
        },
        {
          title: '逾期天数',
          key: 'overdueDays',
          align: 'center',
          width:90
        },
        {
          title: '每日罚息',
          key: 'everyDayPunishedInterest',
          align: 'center',
          width:90
        },
        {
          title: '金额',
          key: 'payAmt',
          align: 'center',
          width:90
        },
        {
          title: '罚金',
          key: 'punishedAmt',
          align: 'center',
          width:90
        },
        {
          title: '开票日',
          key: 'invoiceDate',
          align: 'center',
          width:120
        },
        {
          title: '应收租金',
          key: 'supposedRentAmt',
          align: 'center',
          width:90
        },
        {
          title: '应收利息',
          key: 'supposedInterest',
          align: 'center',
          width:90
        },
        {
          title: '应收罚息',
          key: 'supposedPunishedInterest',
          align: 'center',
          width:90
        },
        {
          title: '减免罚息',
          key: 'deratePunishedInterest',
          align: 'center',
          width:90
        },
        {
          title: '冻结罚息',
          key: 'frozenPunishedInterest',
          align: 'center',
          width:90
        },
        {
          title: '实收本金',
          key: 'actualMajorAmt',
          align: 'center',
          width:90
        },
        {
          title: '实收利息',
          key: 'actualInterest',
          align: 'center',
          width:90
        },
        {
          title: '实收罚息',
          key: 'actualPunishInterest',
          align: 'center',
          width:90
        },
        {
          title: '剩余本金',
          key: 'remainMajorAmt',
          align: 'center',
          width:90
        },
        {
          title: '剩余利息',
          key: 'remainInterest',
          align: 'center',
          width:90
        },
        {
          title: '剩余罚息',
          key: 'remainPunishedInterest',
          align: 'center',
          width:90
        }
      ]

      this.data1 = [{
        repayStatus: '结清',
        shouldPayDate: '2016-03-28',
        actualPayDate: '2016-03-28',
        overdueDays: '0',
        everyDayPunishedInterest: '0',
        payAmt: '5000',
        punishedAmt: '0',
        invoiceDate: '2016-03-28',
        supposedRentAmt: '5000',
        supposedInterest: '1500',
        supposedPunishedInterest: '500',
        deratePunishedInterest: '0',
        frozenPunishedInterest: '0',
        actualMajorAmt: '5000',
        actualInterest: '1500',
        actualPunishInterest: '400',
        remainMajorAmt: '0',
        remainInterest: '50',
        remainPunishedInterest: '100'
      }]
    }

  }
</script>

<style>

</style>