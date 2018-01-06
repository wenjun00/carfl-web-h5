<!--换卡-->
<template>
  <section class="component change-card">
    <i-steps :current="current" style="margin-left:40px;">
      <i-step title="解绑"></i-step>
      <i-step title="绑卡"></i-step>
    </i-steps>
    <i-form :label-width="100" style="margin-top:20px;">
      <i-form-item label="账户类型">
        <i-input style="width:160px;"></i-input>
      </i-form-item>
      <i-form-item label="客户姓名">
        <i-input style="width:160px;"></i-input>
      </i-form-item>
      <i-form-item label="证件类型" v-if="current===2">
        <i-input style="width:160px;"></i-input>
      </i-form-item>
      <i-form-item label="证件号码" v-if="current===2">
        <i-input style="width:160px;"></i-input>
      </i-form-item>
      <i-form-item label="身份证号码" v-if="current===1">
        <i-input style="width:160px;"></i-input>
      </i-form-item>
      <i-form-item label="开户银行">
        <i-input style="width:160px;"></i-input>
      </i-form-item>
      <i-form-item label="开户省市">
        <i-select style="width:80px;">
          <i-option label="陕西省" value="陕西省" key="陕西省"></i-option>
        </i-select>
        <i-select style="width:80px;">
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
      <i-form-item label="银行预留手机号">
        <i-input style="width:160px;"></i-input>
      </i-form-item>
      <i-form-item label="验证码" v-if="current===1">
        <i-input style="width:160px;"></i-input>
        <i-button style="display:inline-block;margin-left:8px;" class="blueButton" size="small">发送验证码<span>60</span></i-button>
      </i-form-item>
    </i-form>
    <i-button @click="confirmUnBindCard" v-if="current===1" style="position:relative;left:340px;">确认解绑</i-button>
    <i-button @click="confirmBindCard" v-if="current===2" style="position:relative;left:340px;">确认绑卡</i-button>
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
  import {
    ApplyQueryService
  } from "~/services/business-service/apply-query.service";
  @Component({
    components: {}
  })
  export default class ChangeCard extends Vue {
    private current: any = 1;
    private openChangeBankCard: Boolean = false;

    @Prop() row: Object;
    created() {

    }
    /**
     * 确认解绑
     */
    confirmUnBindCard() {
      if (this.current === 2) {
        this.current = 0;
      } else {
        this.current += 1;
      }
    }
    /**
     * 确认绑卡
     */
    confirmBindCard() {
      this.current = 1
      this.openChangeBankCard = false
      this.$Modal.remove()
    }
  }
</script>
<style lang="less" scope>

</style>