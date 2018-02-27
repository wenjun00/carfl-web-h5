<!--查看附件-->
<template>
  <section class="component check-attachment">
    <div style="display:flex;justify-content:flex-start;flex-wrap:wrap">
      <div v-for="item in attachmentList" :key="item.index">
        <div style="margin-left:20px;">
          <img :src="item.materialUrl" alt="" style="height:200px;width:200px;border:1px solid #C2C2C2;">
          <div style="text-align:center">{{item.originName}}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ChangeCard from "~/components/purchase-manage/change-card.vue";
import { PaymentScheduleService } from "~/services/manage-service/payment-schedule.service";
import { Dependencies } from "~/core/decorator";
@Component({
  components: {
    ChangeCard
  }
})
export default class CheckAttachment extends Vue {
  @Dependencies(PaymentScheduleService)
  private paymentScheduleService: PaymentScheduleService;
  private attachmentList: Array<Object> = [];
  created() {}
  /**
   * 获取附件列表
   */
  getAttachmentList(row) {
    let businessId = row.id;
    this.paymentScheduleService
      .checkTheVoucher({
        businessId: businessId
      })
      .subscribe(
        data => {
          this.attachmentList = data;
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
}
</script>

<style lang="less">

</style>
