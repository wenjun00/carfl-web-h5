<!--还款详情-->
<template>
  <section class="component repay-info">
    <i-table :columns="columns1" :data="repayDetailList"></i-table>

    <!--查看附件-->
    <template>
      <i-modal title="查看凭证" v-model="checkAttachmentModal" class-name="no-footer" :width="1000" class="purchaseInformation">
        <check-attachment ref="check-attach"></check-attachment>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue";
  import CheckAttachment from "~/components/finance-manage/check-attachment.vue";
  import {
    Prop
  } from "vue-property-decorator";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    PaymentScheduleService
  } from "~/services/manage-service/payment-schedule.service";
  import {
    FilterService
  } from "~/utils/filter.service";
  @Component({
    components: {
      DataBox,
      CheckAttachment
    }
  })
  export default class RepayInfo extends Vue {
    @Dependencies(PaymentScheduleService)
    private paymentScheduleService: PaymentScheduleService;

    // @Prop() personalId;
    // @Prop() businessId;
    private applyDerateOpen: Boolean = false;
    private applyFrozenOpen: Boolean = false;
    private checkAttachmentModal: Boolean = false;
    private columns1: any;
    private repayDetailList: Array < Object > = [];
    created() {
      this.columns1 = [{
          align: "center",
          key: "periods",
          title: "期数"
        },
        {
          title: "操作",
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
          key: "paymentStatus",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.paymentStatus));
          }
        },
        {
          align: "center",
          title: "应付款日",
          key: "paymentDay",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h(
              "span",
              FilterService.dateFormat(row.paymentDay, "yyyy-MM-dd")
            );
          }
        },
        {
          align: "center",
          title: "实际付款日",
          key: "actualPaymentDay",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h(
              "span",
              FilterService.dateFormat(row.actualPaymentDay, "yyyy-MM-dd")
            );
          }
        },
        {
          align: "center",
          title: " 逾期天数",
          key: "overdueDay"
        },
        {
          align: "center",
          title: " 每日罚息",
          key: "penaltyDay"
        },
        {
          align: "center",
          title: " 金额",
          key: "sum"
        },
        {
          align: "center",
          title: " 罚金",
          key: "penalSum"
        },
        {
          align: "center",
          title: " 开票日",
          key: "invoiceDay",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h(
              "span",
              FilterService.dateFormat(row.invoiceDay, "yyyy-MM-dd")
            );
          }
        },
        {
          align: "center",
          title: " 应收租金",
          key: "rentReceivable"
        },
        {
          align: "center",
          title: " 应收本金",
          key: "principalReceivable"
        },
        {
          align: "center",
          title: "应收利息",
          key: "interestReceivable"
        },
        {
          align: "center",
          title: " 应收罚息",
          key: "penaltyReceivable"
        },
        {
          align: "center",
          title: " 减免罚息",
          key: "penaltyDerate"
        },
        {
          align: "center",
          title: " 冻结罚息",
          key: "penaltyFreeze"
        },
        {
          align: "center",
          title: " 实收本金",
          key: "principalReceived"
        },
        {
          align: "center",
          title: " 实收利息",
          key: "interestReceived"
        }
      ];
    }
    /**
     * 查看凭证
     */
    checkProof(row) {
      this.checkAttachmentModal = true;
      let _checkAttach: any = this.$refs["check-attach"];
      _checkAttach.getAttachmentList(row);
    }
    getRepayInfo(orderId) {
      this.paymentScheduleService
        .getPaymentDetail({
          orderId: orderId
        })
        .subscribe(
          data => {
            this.repayDetailList = data;
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
    }
  }

</script>
