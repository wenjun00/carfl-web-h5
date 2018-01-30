<!--还款详情-->
<template>
  <section class="component repay-info">
    <data-box :columns="columns1" :data="data1"></data-box>

    <!--查看附件-->
    <template>
      <i-modal title="查看凭证" v-model="checkAttachmentModal">
        <check-attachment></check-attachment>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import DataBox from "~/components/common/data-box.vue";
  import CheckAttachment from '~/components/finance-manage/check-attachment.vue'
  import {
    Prop
  } from "vue-property-decorator";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    PaymentScheduleService
  } from "~/services/manage-service/paymentSchedule.service";
  @Component({
    components: {
      DataBox,
      CheckAttachment
    }
  })
  export default class RepayInfo extends Vue {
    @Dependencies(PaymentScheduleService) private paymentScheduleService: PaymentScheduleService;

    @Prop() personalId;
    @Prop() businessId;
    private applyDerateOpen: Boolean = false
    private applyFrozenOpen: Boolean = false
    private checkAttachmentModal: Boolean = false
    private columns1: any;
    private data1: Array < Object > = [];
    created() {

      this.columns1 = [{
          align: "center",
          type: "index",
          width: 60,
          title: '期数',
          fixed: 'left'
        },
        {
          title: "操作",
          width: 120,
          fixed: 'left',
          align: "center",
          render: (h, {
            row,
            column,
            index
          }) => {
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
                      this.checkProof(row);
                    }
                  }
                },
                "查看凭证"
              )
            ]);
          }
        },
        {
          align: "center",
          title: "还款状态",
          key: 'payStatus',
          width: 110
        },
        {
          align: "center",
          title: "应付款日",
          key: "supposedPayDate",
          width: 110
        },
        {
          align: "center",
          title: "实际付款日",
          key: "actualPayDate",
          width: 110
        },
        {
          align: "center",
          title: " 逾期天数",
          key: "overPeriodsDay",
          width: 110
        },
        {
          align: "center",
          title: " 每日罚息",
          key: "interestEachDay",
          width: 110
        },
        {
          align: "center",
          title: " 金额",
          key: "money",
          width: 110
        },
        {
          align: "center",
          title: " 罚金",
          key: "punishMoney",
          width: 110
        },
        {
          align: "center",
          title: " 开票日",
          key: "invoiceDate",
          width: 110
        },
        {
          align: "center",
          title: " 应收租金",
          key: "supposedRentMoney",
          width: 110
        },
        {
          align: "center",
          title: " 应收本金",
          key: "supposedPrincipalMoney",
          width: 110
        },
        {
          align: "center",
          title: "应收利息",
          key: "supposedInterest",
          width: 110
        },
        {
          align: "center",
          title: " 应收罚息",
          key: "supposedPunishInterest",
          width: 110
        },
        {
          align: "center",
          title: " 减免罚息",
          key: "derateInterest",
          width: 110
        },
        {
          align: "center",
          title: " 冻结罚息",
          key: "frozenInterest",
          width: 110
        },
        {
          align: "center",
          title: " 实收本金",
          key: "actualPrincipalMoney",
          width: 110
        },
        {
          align: "center",
          title: " 实收利息",
          key: "actualInterest",
          width: 110
        }
      ];

      this.data1 = [{
        payStatus: '结清',
        supposedPayDate: '2017-12-01',
        actualPayDate: '2017-12-01',
        overPeriodsDay: '0',
        interestEachDay: '0',
        money: '1600',
        punishMoney: '0',
        invoiceDate: '2017-12-01',
        supposedRentMoney: '500',
        supposedPrincipalMoney: '950',
        supposedInterest: '150',
        supposedPunishInterest: '0',
        derateInterest: '0',
        frozenInterest: '0',
        actualPrincipalMoney: '1100',
        actualInterest: '150'
      }, {
        payStatus: '结清',
        supposedPayDate: '2017-12-01',
        actualPayDate: '2017-12-01',
        overPeriodsDay: '0',
        interestEachDay: '0',
        money: '1600',
        punishMoney: '0',
        invoiceDate: '2017-12-01',
        supposedRentMoney: '500',
        supposedPrincipalMoney: '950',
        supposedInterest: '150',
        supposedPunishInterest: '0',
        derateInterest: '0',
        frozenInterest: '0',
        actualPrincipalMoney: '1100',
        actualInterest: '150'
      }, {
        payStatus: '结清',
        supposedPayDate: '2017-12-01',
        actualPayDate: '2017-12-01',
        overPeriodsDay: '0',
        interestEachDay: '0',
        money: '1600',
        punishMoney: '0',
        invoiceDate: '2017-12-01',
        supposedRentMoney: '500',
        supposedPrincipalMoney: '950',
        supposedInterest: '150',
        supposedPunishInterest: '0',
        derateInterest: '0',
        frozenInterest: '0',
        actualPrincipalMoney: '1100',
        actualInterest: '150'
      }, {
        payStatus: '结清',
        supposedPayDate: '2017-12-01',
        actualPayDate: '2017-12-01',
        overPeriodsDay: '0',
        interestEachDay: '0',
        money: '1600',
        punishMoney: '0',
        invoiceDate: '2017-12-01',
        supposedRentMoney: '500',
        supposedPrincipalMoney: '950',
        supposedInterest: '150',
        supposedPunishInterest: '0',
        derateInterest: '0',
        frozenInterest: '0',
        actualPrincipalMoney: '1100',
        actualInterest: '150'
      }, {
        payStatus: '结清',
        supposedPayDate: '2017-12-01',
        actualPayDate: '2017-12-01',
        overPeriodsDay: '0',
        interestEachDay: '0',
        money: '1600',
        punishMoney: '0',
        invoiceDate: '2017-12-01',
        supposedRentMoney: '500',
        supposedPrincipalMoney: '950',
        supposedInterest: '150',
        supposedPunishInterest: '0',
        derateInterest: '0',
        frozenInterest: '0',
        actualPrincipalMoney: '1100',
        actualInterest: '150'
      }]
    }
    /**
     * 查看凭证
     */
    checkProof(row) {
      this.checkAttachmentModal = true
    }
    getRepayInfo(personalId, businessId) {
      console.log(this.personalId, this.businessId)
      this.paymentScheduleService.getPaymentRecordDetail({
        personalId: personalId,
        businessId: businessId
      }).subscribe(val => {
        console.log(val, 999)
      })
    }
  }

</script>
<style>


</style>
