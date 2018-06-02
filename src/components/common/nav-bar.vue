<!--导航页面-->
<template>
  <section class="component nav-bar">
    <van-cell-group>
      <van-cell title="首页" to="/home" clickable @click="onNavItemClick" />
      <van-cell title="买新车" to="/home" clickable @click="onNavItemClick" />
    </van-cell-group>
    <div class="van-hairline--bottom"></div>
    <van-cell-group>
      <van-cell title="我的订单" to="/home" clickable @click="onNavItemClick" />
      <van-cell title="月供还款" to="/home" clickable @click="onNavItemClick" />
    </van-cell-group>
    <div class="van-hairline--bottom"></div>
    <van-cell-group>
      <van-cell title="常见问题" to="/home" clickable @click="onNavItemClick" />
      <van-cell title="了解洋葱汽车" to="/home" clickable @click="onNavItemClick" />
      <van-cell title="退出" to="/home" clickable @click="onNavItemClick" />
    </van-cell-group>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Emit } from "vue-property-decorator";

@Component({})
export default class NavBar extends Vue {
  /**
   * 导航项点击 触发事件
   */
  @Emit('nav-item-click')
  onNavItemClick() { }
}
</script>

<style lang="less" scoped>
.nav-bar {
  text-align: left;
}
</style>
