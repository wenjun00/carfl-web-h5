<!--解绑银行卡-->
<template>
  <section class="component unbind-bank-card">
    <i-form :label-width="110" style="margin-top:20px;">
      <i-form-item label="客户姓名">
        <i-input style="width:160px;" v-model="unbindBankCardModal.name" readonly></i-input>
      </i-form-item>
      <i-form-item label="开户银行">
        <i-input style="width:160px;" v-model="unbindBankCardModal.depositBank" readonly></i-input>
      </i-form-item>
      <i-form-item label="银行卡号">
        <i-input style="width:160px;" v-model="unbindBankCardModal.cardNumber" readonly></i-input>
      </i-form-item>
      <i-form-item label="开户省市">
        <i-input style="width:160px;" v-model="unbindBankCardModal.city" readonly></i-input>
      </i-form-item>
      <i-form-item label="银行预留手机号">
        <i-input style="width:160px;" v-model="unbindBankCardModal.reservedPhoneNumber" readonly></i-input>
      </i-form-item>
      <!--<i-form-item label="验证码">
        <i-input style="width:160px;"></i-input>
        <i-button style="display:inline-block;margin-left:8px;" class="blueButton">发送验证码<span>60</span></i-button>
      </i-form-item>-->
    </i-form>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    Prop
  } from "vue-property-decorator";
  import {
    Dependencies
  } from "~/core/decorator";

  @Component({
    components: {}
  })
  export default class UnbindBankCard extends Vue {
    private unbindBankCardModal: Object = {}
    refresh(row) {
      this.unbindBankCardModal = row
    }
  }

</script>
<style lang="less" scoped>


</style>
