<template>
  <section class="page home">
    <section>
      <h3>洋葱汽车</h3>
      <van-search v-model="serachKeyWord" placeholder="寻找您想要买的爱车" show-action @search="onSearch">
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>
    </section>
    <!--品牌列表-->
    <trademark></trademark>
    <!--carlist-->
    <section>
      <div class="break-line"></div>
      <div>
        <img src="/static/images/home/ad.png">
      </div>
      <car-list></car-list>
    </section>
    <section>
      <div class="break-line"></div>
      <question></question>
    </section>
    <section>
      <div class="break-line"></div>
      <div class="content">
        <img src="/static/images/common/home_logo.png">
        <van-button type="primary" size="large" @click="$router.push('/subscribe')">帮我买车</van-button>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Trademark from "~/components/home/trademark.vue";
import Question from "~/components/home/question.vue";
import CarList from "~/components/home/car-list.vue";

@Component({
  components: {
    Trademark,
    CarList,
    Question
  }
})
export default class Home extends Vue {

  private serachKeyWord: string = ''
  private images: Array<string> = ['/static/images/home/home01.png', '/static/images/home/home01.png']



  private onSearch() {
    console.log(this.serachKeyWord)
  }
}
</script>

<style lang="less" scoped>
@marginHight: 20px;
.home {
  text-align: center;
}
.break-line {
  background-color: #f2f2f2;
  height: 10px;
}
.content {
  margin-top: @marginHight;
  margin-bottom: @marginHight;
}
</style>
