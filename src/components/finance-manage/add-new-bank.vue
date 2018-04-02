<!--新增银行卡-->
<template>
  <section class="component add-new-bank">
    <i-row style="margin-top:20px">
      <i-form :label-width="120">
        <i-form-item label="企业客户号">
          <i-input v-model="newBankModel.companyCustomerId" disabled></i-input>
        </i-form-item>
        <i-form-item label="开户银行账户名">
          <i-input v-model="newBankModel.openAccountName"></i-input>
        </i-form-item>
        <i-form-item label="开户银行">
          <i-select v-model="newBankModel.openAccountBankName">
            <i-option label="招商银行" value="招商银行" key="招商银行"></i-option>
            <i-option label="建设银行" value="建设银行" key="建设银行"></i-option>
            <i-option label="工商银行" value="工商银行" key="工商银行"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="银行卡号">
          <i-input v-model="newBankModel.bankCardId"></i-input>
        </i-form-item>
        <i-form-item label="银行卡开户省份">
          <i-select v-model="newBankModel.openAccountProvince" @on-change="provinceChange">
            <i-option v-for="{value,label} in $city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="银行卡开户地区">
          <i-select v-model="newBankModel.openAccountCity">
            <i-option v-for="{value,label} in areaArr" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="银行预留手机号">
          <i-input v-model="newBankModel.leavePhoneNum"></i-input>
        </i-form-item>
        <i-form-item label="是否默认取现卡">
          <i-select v-model="newBankModel.isDefaultCashCard">
            <i-option  label="默认取现卡" value="默认取现卡"></i-option>
            <i-option  label="非默认取现卡" value="非默认取现卡"></i-option>
          </i-select>
        </i-form-item>
      </i-form>
    </i-row>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  @Component({
    components: {}
  })
  export default class AddNewBank extends Vue {
    private newBankModel: any
    private areaArr: any = []
    provinceChange() {
      this.areaArr = this.$city.getCityData({ level: 1, id: this.newBankModel.openAccountProvince })
      console.log('aa')
    }

    created() {
      this.newBankModel = {
        companyCustomerId: '152000015110001',
        openAccountName: '群泰（上海）融资租赁有限公司',
        openAccountBankName: '招商银行',
        bankCardId: '621035456894526',
        openAccountProvince: '',
        openAccountCity: '',
        leavePhoneNum: '15091145645',
        isDefaultCashCard: '默认取现卡'
      }
    }

  }

</script>

<style>


</style>
