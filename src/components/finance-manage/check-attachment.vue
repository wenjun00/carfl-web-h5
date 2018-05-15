<!--查看附件-->
<template>
  <section class="component check-attachment">
      <upload-voucher ref="upload-voucher"></upload-voucher>
  </section>
</template>


<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import ChangeCard from "~/components/purchase-manage/change-card.vue";
  import {PaymentScheduleService} from "~/services/manage-service/payment-schedule.service";
  import {Dependencies} from "~/core/decorator";
  import UploadVoucher from "~/components/common/upload-voucher.vue"
  import {FinanceInvoiceService} from '~/services/manage-service/finance-invoice.service'

  @Component({
    components: {
      ChangeCard,
      UploadVoucher
    }
  })
  export default class CheckAttachment extends Vue {
    @Dependencies(PaymentScheduleService)
    @Dependencies(FinanceInvoiceService) private financeInvoiceService: FinanceInvoiceService
    private paymentScheduleService: PaymentScheduleService;
    private attachmentList: Array<Object> = [];
    private fodderList: any = [];

 

    /**
     * 获取附件列表
     */
    checkAccessory(id) {
      // console.log(id)
      this.financeInvoiceService
        .getFinanceUploadResources({collectMoneyDetailId:id})
        .subscribe(
          val => {
             let uploadFodder: any = this.$refs['upload-voucher']
              uploadFodder.Reverse(val)
            // this.fodderList = val.materialUrl
          },
          ({
            msg
          }) => {
            this.$Message.error(msg)
          }
        )
    }



   
  }
</script>

<style lang="less" scoped>
  .component.check-attachment {
    .modal-item {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap
    }
    .modal-item-ml {
      margin-left: 20px;
    }
    .modal-item-img {
      height: 200px;
      width: 200px;
      border: 1px solid #C2C2C2;
    }
    .modal-item-div{
      text-align:center
    }

  }
</style>
