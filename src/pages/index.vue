<template>
  <section class="main-container full">
    <!--<van-nav-bar :title="navTitle" :left-text="carService" :left-arrow="showBack" @click-left="$router.go(-1)" :right-text="rightText"/>-->
    <router-view ></router-view>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Mutation, Action } from "vuex-class";

@Component({
  components: {}
})
export default class Index extends Vue {
  @State carData
  @State carBrand
  @State carSeries
  private name:Array<string> = ["MyOrder","Home","hotLoading"]
  private car:Array<string> = ["AllVehicles"]
  // 是否显示返回按钮
  get showBack() {
    return  !this.name.includes(this.$route.name)
  }

  get navTitle() {
    let title = this.$route.meta.title
    if(this.$route.name === "AllVehicles" || this.$route.name === "add-information"){
      return
    }else{
      return title || this.carData.modelName
    }
  }
  get carService(){
    if(this.$route.name === "AllVehicles" || this.$route.name === "add-information"){
      return this.$route.meta.title
    }
  }
  get rightText(){
    if(this.$route.name === "AllVehicles"){
      return this.carBrand.brandName
    }
    if(this.$route.name === "add-information"){
      return this.carBrand.brandName+"."+this.carSeries.seriesName
    }
  }
}
</script>

<style lang="less">
.main-container.full {
  .van-icon.van-icon-arrow.van-nav-bar__arrow {
    color: black;
  }
}
</style>
