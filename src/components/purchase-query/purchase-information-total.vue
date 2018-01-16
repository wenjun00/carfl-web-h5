<template>
  <div class="component purchase-information-total">
    <!--选购信息-->
    <i-row>
      <h2>选购信息</h2>
      <data-grid :labelWidth="100" labelAlign="left" contentAlign="left">
        <data-grid-item label="申请省份：" :span="4">上海</data-grid-item>
        <data-grid-item label="申请城市：" :span="4">上海</data-grid-item>
        <data-grid-item label="所属公司：" :span="4">开呗上海</data-grid-item>
      </data-grid>
    </i-row>
    <i-row>
      <table width="760" class="ziliao" border="1" style="border:1px solid #DDDEE1">
        <tr>
          <td>序号</td>
          <td>品牌 型号</td>
          <td>车身颜色</td>
          <td>单价</td>
          <td>数量</td>
          <td>车牌号码</td>
        </tr>
        <tr>
          <td>1</td>
          <td>别克 君越 16年改款</td>
          <td>紫檀红</td>
          <td>198,983.00</td>
          <td>1</td>
          <td>苏A09098</td>
        </tr>
        <tr>
          <td>2</td>
          <td>别克 君越 16年改款</td>
          <td>黑</td>
          <td>198,983.00</td>
          <td>1</td>
          <td>苏A09098</td>
        </tr>
        <tr>
          <td></td>
          <td>合计</td>
          <td></td>
          <td>678696.00</td>
          <td>2</td>
          <td></td>
        </tr>
      </table>
    </i-row>
    <!--个人资料-->
    <i-row style="margin-top:20px;">
      <h2>个人资料</h2>
      <data-grid :labelWidth="100" labelAlign="left" contentAlign="left">
        <data-grid-item label="购车方" :span="6">上海市上海市宝山区中山北路2687号</data-grid-item>
        <data-grid-item label="联系电话" :span="6"></data-grid-item>
        <data-grid-item label="证件类型" :span="4">身份证</data-grid-item>
        <data-grid-item label="证件号码" :span="4">244****7889</data-grid-item>
        <data-grid-item label="邮政编码" :span="4"></data-grid-item>
        <data-grid-item label="联系地址" :span="4"></data-grid-item>
        <data-grid-item label="" :span="4"></data-grid-item>
        <data-grid-item label="" :span="4"></data-grid-item>
        <data-grid-item label="代办俯卧撑" :span="12">
          <i-checkbox-group v-model="fruit">
            <i-checkbox label="上牌"></i-checkbox>
            <i-checkbox label="办理保险"></i-checkbox>
            <i-checkbox label="代缴购置税"></i-checkbox>
            <i-checkbox label="代缴保险税"></i-checkbox>
          </i-checkbox-group>
        </data-grid-item>
      </data-grid>
    </i-row>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    DataGrid,
    DataGridItem
  } from "fintech-vue-component";

  import {
    Prop
  } from "vue-property-decorator";
  import {
    Action
  } from "vuex-class";

  @Component({
    components: {
      DataGrid,
      DataGridItem
    }
  })
  export default class PurchaseInformationTotal extends Vue {
    private fruit: Array < String > = ['购置费'];
    private single: Boolean = false;

    @Prop() person;
    @Action select;
  }

</script>

<style scoped>
  .ziliao td {
    font-size: 14px;
    padding: 5px;
  }

</style>
