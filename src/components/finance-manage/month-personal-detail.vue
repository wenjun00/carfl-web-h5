<!--月还款报表个人详情-->
<template>
  <section class="component month-personal-detail">
    <data-box :data="data1" :columns="columns1"> </data-box>
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
  export default class MonthPersonalDetail extends Vue {
    private columns1: any;
    private data1: Array < Object > = [];
    created() {
      this.columns1 = [{
          title: '期数',
          minWidth: 90,
          fixed: 'left',
          align: 'center',
          key: 'periods'
        },
        {
          title: '应付款日',
          minWidth: 160,
          fixed: 'left',
          align: 'center',
          key: 'shouldPayDate'
        },
        {
          title: '实际付款日',
          minWidth: 160,
          align: 'center',
          key: 'actualPayDate'
        },
        {
          title: '逾期天数',
          minWidth: 90,
          align: 'center',
          key: 'overdueDays'
        },
        {
          title: '每日罚息',
          minWidth: 90,
          align: 'center',
          key: 'everyDayPunishedInterest'
        },
        {
          title: '金额',
          minWidth: 90,
          align: 'center',
          key: 'payAmt'
        },
        {
          title: '罚金',
          minWidth: 90,
          align: 'center',
          key: 'punishedAmt'
        },
        {
          title: '网银到账日',
          minWidth: 120,
          align: 'center',
          key: 'eBankAccountDate'
        },
        {
          title: '开票日',
          minWidth: 120,
          align: 'center',
          key: 'invoiceDate'
        },
        {
          title: '应收租金',
          key: 'supposedRentAmt',
          align: 'center',
          minWidth: 90
        },
        {
          title: '应收利息',
          key: 'supposedInterest',
          align: 'center',
          minWidth: 90
        },
        {
          title: '应收罚息',
          key: 'supposedPunishedInterest',
          align: 'center',
          minWidth: 90
        },
        {
          title: '减免罚息',
          key: 'deratePunishedInterest',
          align: 'center',
          minWidth: 90
        },
        {
          title: '冻结罚息',
          key: 'frozenPunishedInterest',
          align: 'center',
          minWidth: 90
        },
        {
          title: '实收本金',
          key: 'actualMajorAmt',
          align: 'center',
          minWidth: 90
        },
        {
          title: '实收利息',
          key: 'actualInterest',
          align: 'center',
          minWidth: 90
        },
        {
          title: '实收罚息',
          key: 'actualPunishInterest',
          align: 'center',
          minWidth: 90
        },
        {
          title: '剩余本金',
          key: 'remainMajorAmt',
          align: 'center',
          minWidth: 90
        },
        {
          title: '剩余利息',
          key: 'remainInterest',
          align: 'center',
          minWidth: 90
        },
        {
          title: '剩余罚息',
          key: 'remainPunishedInterest',
          align: 'center',
          minWidth: 90
        }
      ]
      this.data1 = [{
        periods:'首付款',
        repayStatus: '结清',
        shouldPayDate: '2016-03-28',
        actualPayDate: '2016-03-28',
        overdueDays: '0',
        everyDayPunishedInterest: '0',
        eBankAccountDate:'2017-12-1',
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
      },{
        periods:'路桥费',
        repayStatus: '结清',
        shouldPayDate: '2016-03-28',
        actualPayDate: '2016-03-28',
        eBankAccountDate:'2017-12-1',
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
      },{
        periods:'购置税',
        repayStatus: '结清',
        shouldPayDate: '2016-03-28',
        actualPayDate: '2016-03-28',
        overdueDays: '0',
        eBankAccountDate:'2017-12-1',
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
      },{
        periods:'第1期',
        repayStatus: '结清',
        shouldPayDate: '2016-03-28',
        actualPayDate: '2016-03-28',
        eBankAccountDate:'2017-12-1',
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
      },{
        periods:'第2期',
        repayStatus: '结清',
        shouldPayDate: '2016-03-28',
        eBankAccountDate:'2017-12-1',
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
      },{
        periods:'第3期',
        repayStatus: '结清',
        shouldPayDate: '2016-03-28',
        actualPayDate: '2016-03-28',
        eBankAccountDate:'2017-12-1',
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
      },{
        periods:'第4期',
        repayStatus: '结清',
        shouldPayDate: '2016-03-28',
        actualPayDate: '2016-03-28',
        eBankAccountDate:'2017-12-1',
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
      },{
        periods:'第5期',
        repayStatus: '结清',
        shouldPayDate: '2016-03-28',
        actualPayDate: '2016-03-28',
        overdueDays: '0',
        eBankAccountDate:'2017-12-1',
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
      },{
        periods:'第6期',
        repayStatus: '结清',
        shouldPayDate: '2016-03-28',
        eBankAccountDate:'2017-12-1',
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
