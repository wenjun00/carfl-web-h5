<!--补传附件-->
<template>
  <section class="component create-personal-account">
    <i-form :label-width="110" v-model="model" ref="form">
      <i-form-item label="账户类型" prop="accountType">
        <i-select style="width:160px;" v-model="model.accountType">
          <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="客户姓名" prop="name">
        <i-input style="width:160px;" v-model="model.name"></i-input>
      </i-form-item>
      <i-form-item label="证件类型" prop="certificateType">
        <i-select style="width:160px;" v-model="model.certificateType">
          <i-option label="身份证" value="身份证" key="身份证"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="证件号码" prop="certificateNumber">
        <i-input style="width:160px;" v-model="model.certificateNumber"></i-input>
      </i-form-item>
      <i-form-item label="开户银行" prop="depositBank">
        <i-input style="width:160px;" v-model="model.depositBank"></i-input>
      </i-form-item>
      <i-form-item label="开户省市" prop="depositCity">
        <i-select style="width:80px;">
          <i-option label="陕西省" value="陕西省" key="陕西省"></i-option>
        </i-select>
        <i-select style="width:80px;" v-model="model.depositCity">
          <i-option label="西安市" value="西安市" key="西安市"></i-option>
          <i-option label="宝鸡市" value="宝鸡市" key="宝鸡市"></i-option>
          <i-option label="咸阳市" value="咸阳市" key="咸阳市"></i-option>
          <i-option label="渭南市" value="渭南市" key="渭南市"></i-option>
          <i-option label="铜川市" value="铜川市" key="铜川市"></i-option>
          <i-option label="榆林市" value="榆林市" key="榆林市"></i-option>
          <i-option label="延安市" value="延安市" key="延安市"></i-option>
          <i-option label="汉中市" value="汉中市" key="汉中市"></i-option>
          <i-option label="安康市" value="安康市" key="安康市"></i-option>
          <i-option label="商洛市" value="商洛市" key="商洛市"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="银行卡号" prop="cardNumber">
        <i-input style="width:160px;" v-model="model.cardNumber"></i-input>
      </i-form-item>
      <i-form-item label="银行预留手机号" prop="reservedPhoneNumber">
        <i-input style="width:160px;" v-model="model.reservedPhoneNumber"></i-input>
      </i-form-item>
      <!--<i-form-item label="验证码">
        <i-input style="width:160px;"></i-input>
        <i-button style="display:inline-block;margin-left:8px;" class="blueButton" size="small">发送验证码<span>60</span></i-button>
      </i-form-item>-->
    </i-form>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  @Component({
    components: {}
  })
  export default class CreatePersonalAccount extends Vue {
    private model: any = {
      accountType: '',
      name: '',
      certificateType: '',
      certificateNumber: '',
      depositBank: '',
      depositCity: '',
      cardNumber: '',
      reservedPhoneNumber: ''
    }
    refresh() {
      // let form: any = this.$refs.form
      // form.resetFields()
    }
    created() {

    }
  }

</script>

<style>


</style>
