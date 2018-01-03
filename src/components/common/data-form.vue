<template>
  <section class="component data-from">
    <el-form ref="data-form" :inline="true" :rules="rules" label-position="left" :model="model">
      <div class="row" style="flex-wrap:nowrap;width:100%;">
        <div class="row middle-span col-span">
          <slot name="default-input"></slot>
          <slot name="collapse-input" v-if="showCollapseContext"></slot>
          <slot name="default-button"></slot>
          <slot name="collapse-button" v-if="showCollapseContext"></slot>
          <el-button @click="submitForm" class="button" style="vertical-align:top">搜索</el-button>
          <el-button @click="resetForm" class="button" style="vertical-align:top">重置</el-button>
        </div>
        <div class="row middle-span center-span" style="flex-basis:40px;" @click="changeCollapseHandle">
          <svg-icon :class="[showCollapseContext ? 'arrow-up':'arrow-down']" v-if="showCollapseIcon" iconClass="xiala"></svg-icon>
        </div>
      </div>
    </el-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Prop, Emit } from "vue-property-decorator";
import { Form } from "element-ui";
import SvgIcon from "~/components/common/svg-icon.vue";
@Component({
  components: {
    SvgIcon
  }
})
export default class DataForm extends Vue {
  @Prop() rules: Array<any>;
  @Prop() model: any;
  @Emit("onSearch")
  onSearch() {}
  private showCollapseIcon: boolean = false;
  private showCollapseContext: boolean = false;

  /**
   * 初始化
   */
  mounted() {
    if (this.$slots["collapse-input"] || this.$slots["collapse-button"]) {
      this.showCollapseIcon = true;
    }
  }

  /**
   * 提交输入表单
   */
  submitForm() {
    let dataForm = <Form>this.$refs["data-form"];
    dataForm.validate(success => {
      if (success) {
        this.onSearch();
      }
    })
  }

  /**
   * 重置输入表单
   */
  resetForm() {
    let dataForm = <Form>this.$refs["data-form"];
    dataForm.resetFields();
  }

  /**
   * 折叠状态改变
   */
  changeCollapseHandle() {
    console.log(this.showCollapseContext);
    this.showCollapseContext = !this.showCollapseContext;
  }
}
</script>

<style lang="less" scoped>
.arrow-down {
  transform: rotate(0deg);
  transition: transform ease-in 0.2s;
}

.arrow-up {
  transform: rotate(180deg);
  transition: transform ease-in 0.2s;
}
</style>
