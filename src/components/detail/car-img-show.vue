<template>
  <section class="component car-img-show">
    <div class="img-center">
      <div class="ex-large"><img class="hendImg hendImg1" src="\static\images\common\headLeftImg.jpg" alt=""> {{carColumn.name}} <img class="hendImg hendImg2" src="\static\images\common\headRightImg.jpg" alt=""> </div>
      <van-row>
        <van-col v-show="bigImg" :span="24">
          <img class="bigImgSty" :src="bigImg.url" :alt="bigImg.name" width="100%" height="100%">
        </van-col>
        <van-col v-for="(item,index) of doubleColShowImages" :key="index" :span="12">
          <img class="smallImgSty" :src="item.url" :alt="item.name" width="100%">
        </van-col>
      </van-row>
      <div class="small">{{carColumn.introduce}}</div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({
  components: {}
})
export default class carImgShow extends Vue {
  @Prop() carColumn // 车辆图片 

  get imageList() {
    return this.carColumn.materialList || []
  }

  /**
   * 获取第一个Image 大图显示
   */
  get bigImg() {
    let result = {}
    if (this.imageList.length % 2 === 1) {
      result = this.imageList[0]
    }
    return result
  }

  /**
   * 获取双列显示图片
   */
  get doubleColShowImages() {
    let result = this.imageList
    if (this.imageList.length % 2 === 1) {
      result = this.imageList.splice(1)
    }
    return result
  }

}
</script>

<style lang="less" scoped>
.component.car-img-show {
  .hendImg {
    height: 4px;
    width: 65px;
  }
  .hendImg2 {
    margin-left: 5px;
  }
  .hendImg1 {
    margin-right: 5px;
  }
  .ex-large {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px !important;
  }
  .bigImgSty {
    padding: 7px;
    box-sizing: border-box;
  }
  .smallImgSty {
    padding: 7px;
    box-sizing: border-box;
  }
  .img-center {
    text-align: center;
    padding-top: 30px;
  }
  .mar10 {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
  }
}
</style>

<style lang="less">
</style>
