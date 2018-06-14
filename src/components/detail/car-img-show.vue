<template>
  <section class="component car-img-show">
    <div class="img-center">
      <div class="ex-large">{{carColumn.name}}</div>
      <van-row>
        <van-col v-show="bigImg" :span="24">
          <img :src="bigImg.url" :alt="bigImg.name" height="100%">
        </van-col>
        <van-col v-for="(item,index) of doubleColShowImages" :key="index" :span="12">
          <img :src="item.url" :alt="item.name" width="100%">
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
  .img-center {
    text-align: center;
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
