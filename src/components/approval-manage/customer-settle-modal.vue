<!--客户还款查询（客户结算号）-->
<template>
  <section class="component customer-settle-modal">
    <i-select style="margin-top:10px;">
      <i-option label="汇付" key="汇付" value="汇付"></i-option>
      <i-option label="支付宝" key="支付宝" value="支付宝"></i-option>
      <i-option label="微信" key="微信" value="微信"></i-option>
    </i-select>
    <data-grid style="margin-top:10px;" :labelWidth="120">
      <data-grid-item label="账户类型" :span="12">
        <template>
          <div>
            <span>个人用户</span>
          </div>
        </template>
      </data-grid-item>
      <data-grid-item label="客户姓名" :span="12">
        <template>
          <div>
            <span>韩冰</span>
          </div>
        </template>
      </data-grid-item>
      <data-grid-item label="客户联系电话" :span="12">
        <template>
          <div>
            <span>18292465893</span>
          </div>
        </template>
      </data-grid-item>
      <data-grid-item label="身份证号码" :span="12">
        <template>
          <div>
            <span>610525199312061245</span>
          </div>
        </template>
      </data-grid-item>
      <data-grid-item label="开户银行" :span="12">
        <template>
          <div>
            <span>建设银行</span>
          </div>
        </template>
      </data-grid-item>
      <data-grid-item label="开户省市" :span="12">
        <template>
          <div>
            <span>陕西西安</span>
          </div>
        </template>
      </data-grid-item>
      <data-grid-item label="银行卡号" :span="12">
        <template>
          <div>
            <span>6227004171150138360</span>
          </div>
        </template>
      </data-grid-item>
      <data-grid-item label="银行预留手机号" :span="12">
        <template>
          <div>
            <span>18292465893</span>
          </div>
        </template>
      </data-grid-item>
    </data-grid>
    <!--<i-button class="blueButton" @click="closeModal" style="position:absolute;margin-left:50%;margin-top:20px;">关闭</i-button>-->
  </section>
</template>

<script lang="ts">
  import Component from 'vue-class-component'
  import {
    Emit
  } from "vue-property-decorator";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    PersonalService
  } from "~/services/manage-service/personal.service";
  import {
    DataGrid,
    DataGridItem
  } from "vue-fintech-component";
  import Vue from "vue";

  @Component({
    components: {
      DataGrid,
      DataGridItem
    }
  })
  export default class CustomerSettleModal extends Vue {
    @Dependencies(PersonalService) private personalService: PersonalService;

    @Emit("closeModal")
    closeCustomerModal() {}

    activated() {}
    created() {

    }
    /**
     * 关闭
     */
    closeModal() {
      this.closeCustomerModal()
    }
    /**
     * 客户结算号
     */
    getCustomerSettleObj(row) {

    }
  }

</script>
<style>


</style>
