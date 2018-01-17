<!--复审终审通过-->
<template>
  <section class="component second-last-approve">
    <i-form :label-width="100">
      <i-row>
        <i-col :span="12">
          <i-form-item label="开呗参考价/成交价">
            <i-input value="128000"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="11">
          <i-form-item label="融资额">
            <i-input value="11400"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="首付比例">
            <i-select value="0%">
              <i-option label="0%" value="0%" key="0%"></i-option>
              <i-option label="10%" value="10%" key="10%"></i-option>
              <i-option label="15%" value="15%" key="15%"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="11">
          <i-form-item label="首付金额">
            <i-input value="12800"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="保证金比例">
            <i-select value="10%">
              <i-option label="0%" value="0%" key="0%"></i-option>
              <i-option label="10%" value="10%" key="10%"></i-option>
              <i-option label="15%" value="15%" key="15%"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="11">
          <i-form-item label="保证金额">
            <i-input value="0"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="尾款本金">
            <i-input></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="11">
          <i-form-item label="尾付金额">
            <i-input value="20000"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="管理费率">
            <i-select value="3%">
              <i-option label="0%" value="0%" key="0%"></i-option>
              <i-option label="3%" value="3%" key="3%"></i-option>
              <i-option label="6%" value="6%" key="6%"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="11">
          <i-form-item label="管理费金额">
            <i-input value="0"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="融资期数">
            <i-select value="12期">
              <i-option label="12期" value="12期" key="12期"></i-option>
              <i-option label="24期" value="24期" key="24期"></i-option>
              <i-option label="36期" value="36期" key="36期"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="11">
          <i-form-item label="期供金额">
            <i-input value="5584"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="月利率（%）">
            <i-select value="0.99">
              <i-option label="0.99" value="0.99" key="0.99"></i-option>
              <i-option label="1.20" value="1.20" key="1.20"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="11">
          <i-form-item label="还款方式">
            <i-select value="等本等息">
              <i-option label="等本等息" value="等本等息" key="等本等息"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="保险费">
            <i-input value="12800"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="11">
          <i-form-item label="路桥费">
            <i-input value="0"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="GPS费">
            <i-input value="0"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="11">
          <i-form-item label="上牌费">
            <i-input value="0"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="购置税">
            <i-input value="0"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="11">
          <i-form-item label="其他费用">
            <i-input value="0"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="23">
          <i-form-item label="备注">
            <i-input value="无"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import {
    Prop
  } from "vue-property-decorator";

  @Component({
    components: {}
  })
  export default class SecondLastApprove extends Vue {

    @Prop()
    row: Object;

    created() {

    }

    cancel() {

    }
    confirm() {

    }
  }

</script>
