<template>
  <section class="page faq">
    <van-cell-group>
      <van-cell title="常见问题">
        <van-icon class="right-icon" slot="right-icon" name="wap-nav" @click="show.navBar = true"></van-icon>
      </van-cell>
    </van-cell-group>
    <question></question>
    <nav-bar v-model="show.navBar"></nav-bar>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Question from "~/components/home/question.vue";
import NavBar from "~/components/common/nav-bar.vue";

@Component({
  components: {
    Question,
    NavBar
  }
})
export default class Faq extends Vue {
  private show = {
    navBar: false
  }
}
</script>

<style lang="less" scoped>
</style>

