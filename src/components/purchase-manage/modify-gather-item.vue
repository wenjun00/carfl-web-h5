<!--编辑收款项-->
<template>
  <section class="component modify-gather-item">
    <i-form :label-width="110" style="margin-top:20px;">
      <i-form-item label="项目名称">
        <i-input v-model="modifyGatherItemModel.itemName"></i-input>
      </i-form-item>
      <i-form-item label="项目金额">
        <i-input v-model="modifyGatherItemModel.itemMoney"></i-input>
      </i-form-item>
    </i-form>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import {
    Prop
  } from "vue-property-decorator";

  @Component({})
  export default class ModifyGatherItem extends Vue {
    private modifyGatherItemModel: Object = {
      itemName: '首付金额',
      itemMoney: '9000'
    }
    created() {}
  }

</script>
