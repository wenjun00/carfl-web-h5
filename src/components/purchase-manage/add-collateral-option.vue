<template>
  <section class="component add-collateral-option">
    <data-grid :labelWidth="90" labelAlign="right" contentAlign="left">
      <data-grid-item :span="4" v-for="item in value" :key="item.attrCode" :label="item.attrName">
        <template>
          <i-radio-group v-model="item.attrValue" @on-change="valueChange" >
            <i-radio :label="1" :disabled="disabled">正常</i-radio>
            <i-radio :label="0" :disabled="disabled">异常</i-radio>
          </i-radio-group>
        </template>
      </data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Emit, Prop, Model } from "vue-property-decorator";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";

@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class AddCollateralOption extends Vue {
  @Model("valueChange") value: Array<any>;

  @Emit("valueChange")
  updateValue(value) { }

  @Prop({
    type: Boolean,
    default: false
  })
  disabled

  private valueChange() {
    this.updateValue(this.value)
  }
}
</script>

<style lang="less" scoped>
</style>

