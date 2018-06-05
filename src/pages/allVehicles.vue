<template> 
  <section class="page allVehicles">
    <div v-for="(item,index) in trademark" :key="index">
      <van-row>
        <van-col class="divide" span="20">{{item}}</van-col>
      </van-row>
      <van-row class="heightAuto">
        <van-col span="6"><img src="/static/images/common/jl.png" alt=""></van-col>
        <van-col span="14">奥迪</van-col>
      </van-row>
    </div>
    <van-row class="rightHeand" >
      <van-col  v-for="(item,index) in trademark" :key="index" span="4">
        <span class="rightDivide" @click="aaa(index)"> {{item}}</span>
      </van-col>
    </van-row>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";

@Component({
  components: {


  }
})
export default class allVehicles extends Vue {

  private trademark: any = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  
/**
 * 当前点击index
 */
 aaa(val){
//    console.log(val)
   
//    let divides = document.getElementsByClassName("divide")[val]
//   //  let rightDivide = document.getElementsByClassName("rightDivide")[val]
//    let top = divides.offsetTop;
//    console.log(top)
//    console.log(divides)
//    document.body.scrollTop = top
  
 }




}
</script>

<style lang="less" scoped>
.page.allVehicles {
  .divide {
    background: #6666;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
  }
  .heightAuto {
    display: flex;
    align-items: center;
  }
  .rigthtAlign {
    text-align: center;
  }
  .rightHeand {
    position: fixed;
    top: 50px;
    right: 10px;
    width: 20px;
    height: 100%;
    float: right;
    font-size: 13px
  }
  .rightHeand {
    .van-col {
      float: initial !important;
    }
    .van-col-4 {
      margin-bottom: 7px;
    }
  }
}
</style>


