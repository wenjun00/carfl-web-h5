<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Emit } from "vue-property-decorator";

// 加载图标库文件
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(require.context("~/assets/icons", false, /\.svg$/));
@Component({
  components: {}
})
export default class SvgIcon extends Vue {
  // name: "SvgIcon";
  @Prop({ required: true })
  iconClass: String;

  get iconName() {
    return `#icon-${this.iconClass}`;
  }
}
</script>

<style lang="less">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
