<template>
  <section class="component carImgShow">
    <!-- 奇数  上面大图-->
    <van-row class="imgCenter" v-for="(item,index) in carImg" :key="index">
      <van-col class="mar10" span="24">{{item.name}}</van-col>
      <div v-if="item.materialList.length %2 !== 0">
        <van-col  span="24">
          <img width="90%" :src="item.materialList[0].url" alt="">
        </van-col>
        <van-col  span="12" v-for="(itemTwo,indexTwo) in item.materialList.splice(1)" :key="indexTwo">
          <img width="90%" :src="itemTwo.url" alt="">
        </van-col>
      </div>
      <div>

      </div>
      
      <van-col v-if="item.materialList.length%2  == 0" span="12" v-for="(itemTwo,indexTwo) in item.materialList" :key="indexTwo"><img width="90%" :src="itemTwo.url" alt=""></van-col>
      <van-col class="mar10" span="24">{{item.introduce}}</van-col>
    </van-row>
    
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({
  components: {

  }
})
export default class carImgShow extends Vue {
  private carImg: any = []  // 车辆图片 
  private imgOne: any = ''
  private imgTwo: any = []
  private evenNumber: any = null

  /**
   * 获取当前数组图片
   */
  carImgFun(val) {
    this.carImg = val
    console.log(this.carImg, 'niubi')

  }





}
</script>

<style lang="less" scoped>
.component.carImgShow {
  .imgCenter {
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
