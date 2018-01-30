<!--查看附件-->
<template>
  <section class="component check-attachment">
    <div style="display:flex;justify-content:flex-start;flex-wrap:wrap">
      <div v-for="item in attachmentList" :key="item.index">
        <div style="margin-left:20px;">
          <div class="attachmentContainer"></div>
          <div style="text-align:center">{{item.attachmentName}}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import ChangeCard from "~/components/purchase-manage/change-card.vue"
  import {
    PaymentScheduleService
  } from "~/services/manage-service/paymentSchedule.service";
  import {
    Dependencies
  } from "~/core/decorator";
  @Component({
    components: {
      ChangeCard
    }
  })
  export default class CheckAttachment extends Vue {
    @Dependencies(PaymentScheduleService) private paymentScheduleService: PaymentScheduleService;
    private attachmentList: Array < Object > = []
    created() {
      this.attachmentList = [{
        index: 1,
        attachmentName: '附件1'
      }, {
        index: 2,
        attachmentName: '附件2'
      }, {
        index: 3,
        attachmentName: '附件3'
      }, {
        index: 4,
        attachmentName: '附件4'
      }, {
        index: 5,
        attachmentName: '附件5'
      }, {
        index: 6,
        attachmentName: '附件6'
      }]
    }
    /**
     * 获取附件列表
     */
    getAttachmentList(row) {
      let businessId = row.id
      this.paymentScheduleService.checkTheVoucher({
        businessId: businessId
      }).subscribe(val => {})
    }
  }

</script>

<style lang="less">
  .attachmentContainer {
    width: 120px;
    height: 100px;
    background-image: url('/static/images/common/invoice2.png')
  }

</style>
