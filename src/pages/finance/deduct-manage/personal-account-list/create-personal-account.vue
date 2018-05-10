<!--补传附件-->
<template>
  <section class="component create-personal-account">
    <i-form :label-width="110" :rule="accountRules" :model="model" ref="form">
      <i-form-item label="账户类型" prop="accountType">
        <i-select v-model="model.accountType">
          <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="客户姓名" prop="name">
        <i-input v-model="model.name"></i-input>
      </i-form-item>
      <i-form-item label="证件类型" prop="certificateType">
        <i-select placeholder="请选择证件类型" v-model="model.certificateType">
          <i-option v-for="{value,label} in $dict.getDictData('0433')" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="证件号码" prop="certificateNumber">
        <i-input v-model="model.certificateNumber"></i-input>
      </i-form-item>
      <i-form-item label="开户银行" prop="depositBank">
        <i-input v-model="model.depositBank"></i-input>
      </i-form-item>
      <i-form-item label="开户省市" prop="depositCity">
        <i-select class="select-city" v-model="model.province">
          <i-option v-for="{value,label} in $city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item>
        <i-select class="select-city" v-model="model.depositCity">
          <i-option v-for="{value,label} in model.province ? $city.getCityData({ level: 1, id: model.province }) : []" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="银行卡号" prop="cardNumber">
        <i-input v-model="model.cardNumber"></i-input>
      </i-form-item>
      <i-form-item label="银行预留手机号" prop="reservedPhoneNumber">
        <i-input v-model="model.reservedPhoneNumber"></i-input>
      </i-form-item>
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
    reservedPhoneNumber: '',
    province: '',
    smsCode: '666666'
  }
  private accountRules: any = {}
  refresh(row) {
    let form: any = this.$refs.form
    form.resetFields()
    this.model.personalId = row.personalId
  }
  created() {
    this.accountRules = {
      certificateNumber: [{
        trigger: 'blur',
        validator: this.$validator.idCard
      }],
      reservedPhoneNumber: [{
        trigger: 'blur',
        validator: this.$validator.phoneNumber
      }]
    }
  }
}

</script>

<style lang="less">

</style>

