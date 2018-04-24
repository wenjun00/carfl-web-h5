<template>
  <section class="component dialog">
    <i-modal :class-name="getClassName()" :okText="okText" :cancelText="cancelText" :title="title" v-model="visible" :transfer="transfer" :mask-closable="maskClosable">
      <slot></slot>
      <div slot="footer">
        <slot name="footer">
          <i-button @click="onCancelClick">{{cancelText}}</i-button>
          <i-button type="primary" @click="onOkClick" :loading="loading">{{okText}}</i-button>
        </slot>
      </div>
    </i-modal>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Model, Emit, Watch } from "vue-property-decorator";

@Component({
  components: {}
})
export default class DialogBox extends Vue {
  @Prop({
    default: false
  })
  transfer: boolean;

  @Prop({
    default: false
  })
  maskClosable: boolean;

  @Prop({
    default: ""
  })
  title: string;

  @Prop({
    default: false
  })
  footer;

  @Prop({
    default: "确定"
  })
  okText;

  @Prop({
    default: "取消"
  })
  cancelText;

  @Prop({})
  onOk;

  @Prop({})
  onCancel;

  @Model("on-visible-change") value: boolean;

  @Emit("on-visible-change")
  emitVisibleChange(value) {
    this.state = value;
  }

  @Emit("on-remove")
  emitRemove() {}

  @Watch("value")
  onVisibleChange(value) {
    this.state = value;
  }

  public state = false;
  public loading = false;

  get visible() {
    return this.state;
  }

  set visible(value) {
    if (value === false) {
      this.emitRemove();
    }
    this.emitVisibleChange(value);
  }

  /**
   * 获取类名称
   */
  getClassName() {
    let classes = ["dialog-modal"];

    if (this.footer === false) {
      classes.push("no-footer");
    }

    return classes.join(" ");
  }

  async onOkClick() {
    if (this.onOk) {
      let contentVNode;

      if (this.$slots.default && this.$slots.default.length) {
        contentVNode = this.$slots.default[0];
      }
      if (
        (await this.onOk.call(this, contentVNode.componentInstance)) === false
      ) {
        return;
      }
    }

    this.visible = false;
  }

  onCancelClick() {
    if (this.onCancel) {
      this.onCancel.call(this);
    }

    this.visible = false;
  }

  mounted() {
    this.state = !!this.value;
  }
}
</script>

<style lang="less" scoped>
.component.dialog {
  z-index: 100;
  position: relative;
}
</style>

<style lang="less">
.component.dialog {
  .dialog-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;
      min-width: 70%;

      .ivu-modal-content {
        min-width: 700px;
      }
    }

    .ivu-modal-close {
      color: #ccc;
    }

    &.no-footer {
      .ivu-modal-footer {
        display: none;
      }
    }
  }
}
</style>
