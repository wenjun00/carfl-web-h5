<!--解绑银行卡-->
<template>
  <section class="component unbind-bank-card">
    <i-form :label-width="110" style="margin-top:20px;">
      <i-form-item label="客户姓名">
        <i-input style="width:160px;" v-model="unbindBankCardModal.customerName"></i-input>
      </i-form-item>
      <i-form-item label="开户银行">
        <i-input style="width:160px;" v-model="unbindBankCardModal.bank"></i-input>
      </i-form-item>
      <i-form-item label="开户省市">
        <i-input style="width:160px;" v-model="unbindBankCardModal.city"></i-input>
      </i-form-item>
      <i-form-item label="银行预留手机号">
        <i-input style="width:160px;" v-model="unbindBankCardModal.leavePhone"></i-input>
      </i-form-item>
      <i-form-item label="验证码">
        <i-input style="width:160px;"></i-input>
        <i-button style="display:inline-block;margin-left:8px;" class="blueButton">发送验证码<span>60</span></i-button>
      </i-form-item>
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
    @Prop() row: Object;
    created() {
      this.unbindBankCardModal = {
        customerName: '胡开甲',
        bank: '中国建设银行',
        city: '西安',
        leavePhone: '1509114656'
      }
    }
  }

</script>
<style lang="less" scope>


</style>
