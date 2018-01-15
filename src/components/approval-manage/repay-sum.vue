<!--还款总览-->
<template>
  <section class="component repay-sum">
    <div style="text-align:right">
      <i-button @click="applyDerate" class="blueButton" size="small" style="margin:10px;">申请减免</i-button>
      <i-button @click="applyFrozen" class="blueButton" size="small">申请冻结</i-button>
    </div>
    <data-grid :labelWidth="90" labelAlign="left" contentAlign="left">
      <data-grid-item label="客户姓名" :span="2">
        <template>
          <div>韩冰</div>
        </template>
      </data-grid-item>
      <data-grid-item label="身份证号" :span="4">
        <template>
          <div>610525199312061245</div>
        </template>
      </data-grid-item>
      <data-grid-item label="融资金额（元）" :span="2">
        <template>
          <div>1500</div>
        </template>
      </data-grid-item>
      <data-grid-item label="期数" :span="2">
        <template>
          <div>12期</div>
        </template>
      </data-grid-item>
      <data-grid-item label="利率%/月" :span="2">
        <template>
          <div>4.35</div>
        </template>
      </data-grid-item>
    </data-grid>

    <table border="1" width="868" style="margin-top:10px;text-align:center">
      <tr height="40">
        <td bgcolor="#F2F2F2" colspan="3">还款</td>
        <td bgcolor="#F2F2F2" colspan="4">明细</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">本金</td>
        <td>应付本金</td>
        <td>800</td>
        <td>已还本金</td>
        <td>0</td>
        <td>剩余本金</td>
        <td>800</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">利息</td>
        <td>应还利息</td>
        <td>200</td>
        <td>已还利息</td>
        <td>0</td>
        <td>剩余利息</td>
        <td>200</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">罚息</td>
        <td>应付罚息</td>
        <td>10</td>
        <td>已还罚息</td>
        <td>0</td>
        <td>剩余罚息</td>
        <td><span style="color:red;text-decoration:line-through;margin-right:6px">10</span><span>0</span></td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">合计</td>
        <td>应付</td>
        <td>1010</td>
        <td>已还本金</td>
        <td>0</td>
        <td>剩余本金</td>
        <td>1010</td>
      </tr>
    </table>

    <template>
      <i-modal title="申请减免" v-model="applyDerateOpen">
        <apply-derate></apply-derate>
      </i-modal>
    </template>

    <template>
      <i-modal title="申请冻结" v-model="applyFrozenOpen">
        <apply-frozen></apply-frozen>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import ApplyDerate from '~/components/approval-manage/apply-derate.vue'
  import ApplyFrozen from '~/components/approval-manage/apply-frozen.vue'

  import {
    DataGrid,
    DataGridItem
  } from "fintech-vue-component";
  import {
    Prop
  } from "vue-property-decorator";

  @Component({
    components: {
      DataGrid,
      DataGridItem,
      ApplyDerate,
      ApplyFrozen
    }
  })
  export default class RepaySum extends Vue {
    private applyDerateOpen: Boolean = false
    private applyFrozenOpen: Boolean = false

    @Prop()
    row: Object;

    created() {

    }
    applyDerate() {
      this.applyDerateOpen = true
    }
    applyFrozen() {
      this.applyFrozenOpen = true
    }
  }

</script>
<style>


</style>
