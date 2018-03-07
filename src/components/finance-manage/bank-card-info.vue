<!--个人银行卡详情-->
<template>
  <section class="component bank-card-info">
    <div style="width:100%;height:40px;border:1px solid black;line-height:40px;background:#F2F2F2">
      <span style="margin-left:6px;">招商银行</span>
      <div style="float:right">
        <i-button class="blueButton" size="small" style="margin-right:10px;" @click="changeBankCard">更换</i-button>
        <i-button class="blueButton" size="small" style="margin-right:4px;" @click="unbindBankCard">解绑</i-button>
      </div>
    </div>
    <div style="text-align:center;border-left:1px solid black;border-right:1px solid black;height:100px;">
      <span style="margin-left:97px">5719******0829</span>
      <p>户名：开呗（上海）汽车租赁有限公司陕西分公司</p>
      <p>8888888</p><span>城市：西安</span>
      <p>开户行：招商银行</p>
    </div>
    <div style="border:1px solid black;height:40px;line-height:40px">
      <span style="margin-left:6px;">验证状态：</span><span style="color:green">通过</span>
      <span style="float:right;margin-right:6px;">绑卡日期：2017-12-01</span>
    </div>

    <template>
      <i-modal title="换卡" v-model="changeBankCardModal" width="480" class="changeCard">
        <change-card @close="close"></change-card>
        <div slot="footer">
          <i-button>取消</i-button>
          <i-button class="blueButton">确认解绑</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal title="解绑银行卡" width="480" v-model="unbindBankCardModal">
        <unbind-bank-card></unbind-bank-card>
        <div slot="footer">
          <i-button @click="unbindBankCardModal=false" class="defaultButton">取消</i-button>
          <i-button @click="unbindBankCardModal=false" class="blueButton">确认解绑</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import ChangeCard from "~/components/purchase-manage/change-card.vue"
  import UnbindBankCard from "~/components/purchase-manage/unbind-bank-card.vue"
  import { ChargeBackService } from "~/services/manage-service/charge-back.service";
  import { Dependencies } from "~/core/decorator";

  @Component({
    components: {
      ChangeCard,
      UnbindBankCard
    }
  })
  export default class BankCardInfo extends Vue {
    @Dependencies(ChargeBackService) private chargeBackService: ChargeBackService;
    private changeBankCardModal: Boolean = false
    private unbindBankCardModal: Boolean = false
    refresh(row) {
      this.chargeBackService.getPersonalBank({ id: row.personalId, accountType: row.accountType }).subscribe(val => {
      }, ({ msg }) => {
        this.$Message.error(msg)
      })
    }
    created() {

    }
    changeBankCard() {
      this.changeBankCardModal = true
    }
    /**
     * 解绑银行卡
     */
    unbindBankCard() {
      this.unbindBankCardModal = true
    }
    close() {
      this.changeBankCardModal = false
    }
  }

</script>

<style lang="less">
  .changeCard {
    .ivu-modal-footer {
      display: none;
    }
  }

</style>
