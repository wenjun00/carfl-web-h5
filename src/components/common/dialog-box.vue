<template>
  <section class="component dialog">
    <i-modal :class-name="getClassName()" :title="title" v-model="value" :transfer="transfer" :mask-closable="maskClosable">
      <slot></slot>
      <div slot="footer">
        <slot name="footer"></slot>
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
  footer: boolean;

  private alwayShow;

  @Model("on-visible-change") _visible: boolean;

  @Emit("on-visible-change")
  emitVisibleChange(value) {}

  @Watch("_visible")
  onVisibleChange(value) {
    this.visible = value;
  }

  private visible = false;

  get value() {
    return this.visible;
  }

  set value(value) {
    this.visible = value;
    this.onVisibleChange(value);
  }

  getClassName() {
    let classes = ["dialog-modal"];

    if (!this.footer) {
      classes.push("no-footer");
    }

    return classes.join(" ");
  }

  show() {
    this.visible = true;
  }

  mounted() {
    this.value = this._visible;
  }
}
</script>

<style lang="less" scoped>
.component.dialog {
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
