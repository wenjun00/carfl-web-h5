<!--申请冻结-->
<template>
  <section class="component apply-frozen">
    <data-grid :labelWidth="120">
      <data-grid-item label="应还罚息" :span="6">
        <template>
          <div>1000</div>
        </template>
      </data-grid-item>
      <data-grid-item label="已还罚息" :span="6">
        <template>
          <div>800</div>
        </template>
      </data-grid-item>
      <data-grid-item label="可冻结罚息" :span="6">
        <template>
          <div>200</div>
        </template>
      </data-grid-item>
      <data-grid-item label="冻结罚息" :span="6">
        <template>
          <i-input style="width:90%"></i-input>
        </template>
      </data-grid-item>
      <data-grid-item label="备注" :span="12">
        <template>
          <i-input style="width:90%" type="textarea"></i-input>
        </template>
      </data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import {
    Prop
  } from "vue-property-decorator";
  import {
    DataGrid,
    DataGridItem
  } from "fintech-vue-component";
  
  @Component({
    components: {
      DataGrid,
      DataGridItem
    }
  })
  export default class ApplyFrozen extends Vue {
    private columns1: any;
    private data1: Array < Object > = [];
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