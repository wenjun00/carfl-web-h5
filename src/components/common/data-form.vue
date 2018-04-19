<template>
  <section class="component data-form">
    <div class="date-query-list row">
      <div v-for="(value, key) in timeQueryTypes" :key="key" class="data-query-item" :class="{active:currentTimeType===key}" @click="onSelectQueryTime(key)"></div>
    </div>
    <i-form ref="data-form" inline :rules="rules" label-position="left" :model="model">
      <div class="row" style="flex-wrap:nowrap;width:100%;">
        <div class="row middle-span col-span">
          <slot name="input"></slot>
          <el-button v-if="!hiddenSearch" @click="onSubmitForm" class="search-button" style="vertical-align:top">搜索</el-button>
          <el-button v-if="showResetButton" @click="onResetForm" class="reset-button" style="vertical-align:top">重置</el-button>
          <div :style="{width:buttonWrap?'100%':'10px'}"></div>
          <slot name="button"></slot>
          <div class="col-span" v-show="showAppendContext">
          </div>
          <slot name="append">
          </slot>
        </div>
        <div class="row middle-span center-span collapse-icon" style="flex-basis:40px;" @click="onCollapseChange">
          <svg-icon :class="[showCollapseContext ? 'arrow-up':'arrow-down']" v-if="showCollapseIcon" iconName="xiala"></svg-icon>
        </div>
      </div>
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Prop, Emit } from "vue-property-decorator";
import { Form } from "iview";
import { PageService } from "~/utils/page.service";
import SvgIcon from "~/components/common/svg-icon.vue";

@Component({
  components: {
    SvgIcon
  }
})
export default class DataForm extends Vue {
  // 验证规则
  @Prop({})
  rules: any;
  // 数据模型
  @Prop({})
  model: any;
  // 数据模型
  @Prop({})
  page: PageService;
  //隐藏搜索按钮
  @Prop({
    type: Boolean,
    default: false
  })
  buttonWrap: boolean;
  //隐藏搜索按钮
  @Prop({
    type: Boolean,
    default: false
  })
  hiddenSearch: boolean;
  // 隐藏重置按钮
  @Prop({
    type: Boolean,
    default: false
  })
  hiddenReset: boolean;

  // 发送查询事件
  @Emit("onSearch")
  emitSearch() {}
  // 发送重置事件
  @Emit("onReset") // 手动清空输入框
  emitReset() {}

  private showCollapseIcon: boolean = false;
  private showResetButton: boolean = false;
  private showCollapseContext: boolean = false;
  private showAppendContext: boolean = false;
  private timeQueryTypes = {
    0: "昨日",
    1: "今日",
    2: "本周",
    3: "本月",
    4: "上月",
    5: "最近三月",
    6: "本季度",
    7: "本年"
  };
  private currentTimeType = null;

  /**
   * 提交输入表单
   */
  onSubmitForm() {
    let dataForm = <Form>this.$refs["data-form"];
    dataForm.validate(success => {
      if (!success) {
        return;
      }

      if (this.page) {
        this.page.reset();
      }

      this.emitSearch();
    });
  }

  /**
   * 重置输入表单
   */
  onResetForm() {
    let dataForm = <Form>this.$refs["data-form"];
    dataForm.resetFields();
    this.emitReset();
  }

  /**
   * 折叠状态改变
   */
  onCollapseChange() {
    if (this.showCollapseIcon) {
      this.showCollapseContext = !this.showCollapseContext;
    }
  }

  onSelectQueryTime(key) {
    this.currentTimeType = key;
  }

  /**
   * 初始化
   */
  mounted() {
    if (this.$slots["collapse-input"] || this.$slots["collapse-button"]) {
      this.showCollapseIcon = true;
    }
    if (this.$slots["collapse-input"] || this.$slots["default-input"]) {
      this.showResetButton = !this.hiddenReset && true;
    }
    if (this.$slots["append"]) {
      this.showAppendContext = true;
    }
  }
}
</script>

<style lang="less" scoped>
.component.data-form {
  padding: 0 10px;
}
.arrow-down {
  transform: rotate(0deg);
  transition: transform ease-in 0.2s;
}
.arrow-up {
  transform: rotate(180deg);
  transition: transform ease-in 0.2s;
}
.collapse-icon {
  height: 30px;
}
</style>

<style lang="less">
.component.data-form {
  .el-radio-group {
    padding-left: 10px;
  }
}
</style>
