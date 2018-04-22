<!--编辑收款项-->
<template>
  <section class="component modify-gather-item">
    <i-form :label-width="110" :model="modifyGatherItemModel" class="item-margin-top20">
      <i-form-item label="项目名称" prop="itemName">
        <i-input v-model="modifyGatherItemModel.itemName"></i-input>
      </i-form-item>
      <i-form-item label="项目金额" prop="itemMoney">
        <i-input-number v-model="modifyGatherItemModel.itemMoney" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"> </i-input-number>

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

<style lang="less" scoped>
  .item-margin-top20{
    margin-top: 20px;
  }
  .modify-gather-item{
    .ivu-form{
      position: relative;
      right:20px;
    }
  }
</style>

