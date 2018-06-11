<template>
  <section class="page details">
    <van-row>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img class="carImg" :src="image.url" />
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
      <van-col span="24">{{carList.modelName}}</van-col>
      <!-- <van-col class="price">
        <span>商场指导价:</span>
        <span>17.98万</span>
      </van-col> -->
    </van-row>
    <van-row class="guarantee">
      <van-col span="8" class="textCenter">
        <van-icon name="certificate" />
        <span> 包购置税</span>
      </van-col>
      <van-col span="8" class="textCenter">
        <van-icon name="certificate" />
        <span> 送一年保险</span>
      </van-col>
      <van-col span="8" class="textCenter">
        <van-icon name="certificate" />
        <span> 全国联保</span>
      </van-col>
    </van-row>
    <van-row>
      <DetailsScheme></DetailsScheme>
    </van-row>

  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";
import DetailsScheme from "~/components/common/detailsScheme.vue";
import { carManagementService } from "~/services/manage-service/car-management.service";
import { Dependencies } from "~/core/decorator";

@Component({
  components: {
    DetailsScheme,
  }
})
export default class Details extends Vue {
  @Dependencies(carManagementService) private carManagementService: carManagementService;
  private paramsId = ''
  private carList = []
  private images = []
  BackTop() {
    document.documentElement.scrollTop = 0
    window.scrollTo(0, 0);
  }
  /**
   * 获取当前页面路由id
   */
  private getParamsid() {
    this.paramsId = this.$route.params.id
  }

  /**
  * 获取车辆基本配置
  */
  getBasicEquipment() {
    this.carManagementService.getCarDetail({ carId: this.paramsId }).subscribe(
      data => {
        this.carList = data
      },
      err => this.$toast(err.msg)
    )
  }
  /**
  * 获取车辆首页图片
  */
  getCarPictureFun() {
    this.carManagementService.getCarPictureList({ carId: this.paramsId }).subscribe(
      data => {
        this.images = data
      },
      err => this.$toast(err.msg)
    )
  }


  mounted() {
    this.getParamsid()
    this.BackTop()
    this.getBasicEquipment()
    this.getCarPictureFun()
  }
}
</script>

<style lang="less" scoped>
.page.details {
  .textCenter {
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

