<template>
  <section class="page home">
    <section>
      <form action="/">
        <van-search v-model="keyWord" placeholder="寻找您想要买的爱车" @click-icon="keyWord = ''" show-action @search="onSearch">
          <div slot="action">
            <van-icon class="home-nav-bar" v-if="!show.search" name="wap-nav" @click="show.navBar = true" />
            <div class="home-nav-bar" v-else @click="onSearch">搜索</div>
          </div>
        </van-search>
      </form>
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

    <van-popup v-model="show.navBar" position="right" @click-overlay="show.navBar = false">
      <nav-bar @nav-item-click="show.navBar = false"></nav-bar>
    </van-popup>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Trademark from "~/components/home/trademark.vue";
import Question from "~/components/home/question.vue";
import CarList from "~/components/home/car-list.vue";
import NavBar from "~/components/common/nav-bar.vue";

@Component({
  components: {
    Trademark,
    CarList,
    Question,
    NavBar
  }
})
export default class Home extends Vue {

  private serachKeyWord: string = ''

  get keyWord() {
    return this.serachKeyWord
  }
  set keyWord(val) {
    this.serachKeyWord = val
    this.show.search = val !== ""
  }

  private images: Array<string> = ['/static/images/home/home01.png', '/static/images/home/home01.png']

  // 控制各个组件显示flag
  private show = {
    navBar: false,
    search: false
  }

  private onSearch() {
    console.log(this.serachKeyWord)
  }
}
</script>

<style lang="less" scoped>
@marginHight: 20px;
@paddingNum: 10px;
.home {
  text-align: center;
  &-nav-bar {
    padding-left: @paddingNum;
    padding-right: @paddingNum;
  }
}
.break-line {
  background-color: #f2f2f2;
  height: 10px;
}
.content {
  margin-top: @marginHight;
  margin-bottom: @marginHight;
}
.van-popup {
  &--right {
    height: 100%;
    margin-top: 45px;
    width: 60%;
  }
}
</style>

<style lang="less">
.home {
  .van-modal {
    /*控制上面导航栏也展示出来 再加1像素*/
    margin-top: 46px;
  }
}
</style>

