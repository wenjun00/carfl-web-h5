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
          <img height="200px" :src="image" />
        </van-swipe-item>
      </van-swipe>
    </section>
    <!--品牌列表-->
    <trademark></trademark>
    <!--carlist-->
    <section>
      <div class="break-line"></div>
      <div>
        <img class="siftCar" height="30px" src="/static/images/home/ad.png">
      </div>
      <car-list></car-list>
    </section>
    <section>
      <div class="break-line"></div>
      <h3>常见问题</h3>
      <question></question>
    </section>
    <section>
      <div class="break-line"></div>
      <div class="content">
        <img height="35px" src="/static/images/common/home_logo.png">
        <van-col class="describe">中业金服旗下洋葱汽车新品上线</van-col>
        <van-button type="primary" class="full-radius" size="large" @click="$router.push('/subscribe')">帮我买车</van-button>
      </div>
    </section>

    <nav-bar v-model="show.navBar"></nav-bar>
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
.describe {
  width: 100%;
  color: #666666;
  margin-bottom: 10px;
}
.content {
  text-align: center;
  margin-top: @marginHight;
  margin-bottom: @marginHight;
}
.siftCar {
  margin: 10px;
}
</style>


