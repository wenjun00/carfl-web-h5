<template>
  <section class="component data-from">
    <el-form ref="data-form" :inline="true" :rules="rules" label-position="left" :model="model">
      <slot name="default"></slot>
      <slot name="collapse"></slot>
      <slot name="button"></slot>
      <el-button @click="submitForm" class="button" style="vertical-align:top">搜索</el-button>
      <el-button @click="resetForm" class="button" style="vertical-align:top">重置</el-button>
    </el-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Prop, Emit } from "vue-property-decorator";
import { Form } from "element-ui";

@Component({
  components: {}
})
export default class DataForm extends Vue {
  @Prop() rules: Array<any>;
  @Prop() model: any;
  @Emit("onSearch")
  onSearch() {}

  /**
   * 提交输入表单
   */
  submitForm() {
    this.onSearch();
  }

  /**
   * 重置输入表单
   */
  resetForm() {
    let dataForm = <Form>this.$refs["data-form"];
    dataForm.resetFields();
  }
}
</script>

<style lang="less" scoped>

</style>
