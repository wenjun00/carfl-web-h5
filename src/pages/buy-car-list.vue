<template >
  <section class="page buy-car-list">
    <!-- 车牌 -->
    <div v-for="(item,index) in carBrand" :key="index">
      <div class="brandHeand" :class=item.value>{{item.value}}</div>
      <div>是代表发士大夫</div>
      <div>符合规范的观点</div>
      <!-- <ul class="brandContent" v-for="(itemTwo,index) in item.children" :key="index">
        <li @click="chooseBrand(itemTwo.id,itemTwo.brandName)">
          <img v-if="!itemTwo.brandPhotoUrl" class="siftCar" height="20px" src="/images/car.png">
          <img v-else class="siftCar" height="20px" :src="itemTwo.brandPhotoUrl">
          <span> {{itemTwo.brandName}}</span>
        </li>
      </ul> -->
    </div>
   <!-- 左侧字母 -->
    <div class="left-side-fixed">
      <ul v-for="(item,index) in carBrandTwo" :key="index">
        <li @click="onClickBrand(item.value)" style="display:inline-block;margin-top:5px">{{item.value}}</li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";

@Component({
  components: {}
})
export default class BuyCarList extends Vue {
 // 车牌
  private carBrand = [
    { value: "A", id: "A" }, { value: "B", id: "B" }, { value: "C", id: "C" }, { value: "D", id: "D" }, { value: "E", id: "E" }, { value: "F", id: "F" },
    { value: "G", id: "G" }, { value: "H", id: "H" }, { value: "I", id: "I" }, { value: "J", id: "J" }, { value: "K", id: "K" }, { value: "L", id: "L" },
    { value: "M", id: "M" }, { value: "N", id: "N" }, { value: "O", id: "O" }, { value: "P", id: "P" }, { value: "Q", id: "Q" }, { value: "R", id: "R" },
    { value: "S", id: "S" }, { value: "T", id: "T" }, { value: "U", id: "U" }, { value: "V", id: "V" }, { value: "W", id: "W" }, { value: "X", id: "X" },
    { value: "Y", id: "Y" }, { value: "Z", id: "Z" },
  ]
  // 左侧字母
  private carBrandTwo = [
    { value: "A", id: "A" }, { value: "B", id: "B" }, { value: "C", id: "C" }, { value: "D", id: "D" }, { value: "E", id: "E" }, { value: "F", id: "F" },
    { value: "G", id: "G" }, { value: "H", id: "H" }, { value: "I", id: "I" }, { value: "J", id: "J" }, { value: "K", id: "K" }, { value: "L", id: "L" },
    { value: "M", id: "M" }, { value: "N", id: "N" }, { value: "O", id: "O" }, { value: "P", id: "P" }, { value: "Q", id: "Q" }, { value: "R", id: "R" },
    { value: "S", id: "S" }, { value: "T", id: "T" }, { value: "U", id: "U" }, { value: "V", id: "V" }, { value: "W", id: "W" }, { value: "X", id: "X" },
    { value: "Y", id: "Y" }, { value: "Z", id: "Z" },
  ]
  private onClickBrand(item){
    let scroll:any =  document.querySelector(`.${item}`)
    scroll.scrollIntoView({block:'start',behavior:'smooth'})
  }
}
</script>

<style lang="less" scoped>
  .page.buy-car-list{
    .brandHeand {
      padding-left: 10px;
      background: #f1f1f1;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      // ul {
      //   padding-left: 20px !important;
      //   font-size: 14px !important;
      //   line-height: 35px !important;
      // }
    }
    .left-side-fixed {
      cursor: pointer;
      width: 50px;
      text-align: right;
      position: fixed;
      top: 10%;
      right: 10px;
      font-size: 12px;
      color: rgb(153, 153, 153)
    }
  }
</style>


