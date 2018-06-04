<template>
  <section class="page details">
    <van-row>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img class="carImg" :src="image" />
        </van-swipe-item>
      </van-swipe>
    </van-row>
    <van-row class="carDetails">
      <van-col class="detailsOne" span="20">车辆照片仅供参考,已配置描述为准</van-col>
      <van-col class="imgLength" span="4">
        <span>3/1</span>
      </van-col>
    </van-row>
    <van-row class="textDescription">
      <van-col span="24">JEEP 指南者2017款1.4T家享版5座</van-col>
      <van-col class="price">
        <span>商场指导价:</span>
        <span>17.98万</span>
      </van-col>
    </van-row>
    <van-row class="guarantee">
      <van-col span="8" class="textCenter">
        <van-icon name="certificate" />
        <span> 包购置税</span>
      </van-col>
      <van-col span="8"  class="textCenter">
        <van-icon name="certificate" />
        <span> 送一年保险</span>
      </van-col>
      <van-col span="8"  class="textCenter">
        <van-icon name="certificate" />
        <span> 全国联保</span>
      </van-col>
    </van-row>
    <van-row>
      <DetailsScheme></DetailsScheme>
    </van-row>
     <van-row>
      <CarGoHome></CarGoHome>
    </van-row>

  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";
import DetailsScheme from "~/components/common/detailsScheme.vue";
import CarGoHome from "~/components/common/carGoHome.vue";

@Component({
  components: {
    DetailsScheme,
    CarGoHome
  }
})
export default class Details extends Vue {

  private images = ['/static/images/common/car.png', '/static/images/common/car.png', '/static/images/common/car.png']

}
</script>

<style lang="less" scoped>
.page.details {
  .textCenter{
    text-align: center;
  }
  .carImg {
    height: 200px;
    width: 100%;
  }
  .carDetails {
    border-bottom: 1px solid darkgray;
    padding: 10px;
    font-size: 12px;
    .detailsOne {
      color: gray;
    }
    .imgLength {
      display: inline-block;
      background: darkgray;
      color: white;
      border-radius: 45%;
      height: 20px;
      width: 40px;
      text-align: center;
      line-height: 20px;
    }
  }
  .textDescription {
    padding: 5px;
    border-bottom: 1px solid darkgray;
    span {
      height: 25px;
      line-height: 25px;
    }
    .price {
      font-size: 12px;
    }
  }
  .guarantee {
    font-size: 13px;
    font-weight: 600;
    height: 25px;
    line-height: 25px;
    border-bottom: 1px solid darkgray;
    color: lightslategrey;
    padding-left: 5px;
  }
}
</style>

