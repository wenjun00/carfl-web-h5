<template>
  <section class="main-container full">
    <van-nav-bar :title="navTitle" :left-text="showBack ? '返回' : ''" :left-arrow="showBack" @click-left="$router.go(-1)" />
    <router-view></router-view>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {}
})
export default class Index extends Vue {
  // 是否显示返回按钮
  get showBack() {
    return this.$route.name !== "Home"
  }

  get navTitle() {
    let title = this.$route.meta.title
    return title || '洋葱汽车'
  }
}
</script>

<style lang="less" scoped>
</style>
