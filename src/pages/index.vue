<template>
  <section class="main-container full">
    <van-nav-bar :title="navTitle" :left-text="showBack ? '' : ''" :left-arrow="showBack" @click-left="$router.go(-1)" />
    <router-view ></router-view>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Mutation, Action } from "vuex-class";

@Component({
  components: {}
})
export default class Index extends Vue {
  @State carData

  private name:Array<string> = ["MyOrder","Home"]
  // 是否显示返回按钮
  get showBack() {
    return  !this.name.includes(this.$route.name)
  }

  get navTitle() {
    let title = this.$route.meta.title
    return title || this.carData.modelName
  }
}
</script>

<style lang="less">
.main-container.full {
  .van-icon.van-icon-arrow.van-nav-bar__arrow {
    color: black;
  }
}
</style>
