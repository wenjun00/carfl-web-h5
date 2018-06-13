<template>
  <section class="page knowOnionCar">
    <van-row v-for="(item,index) in carImg" :key="index">
      <van-col class="backgroundColor" span="24"><img width="100%" :src="item" alt=""></van-col>
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
export default class MyOrder extends Vue {
 private carImg :any =['/static/images/common/onionCar.png','/static/images/common/onionCar1.png','/static/images/common/onionCar2.png','/static/images/common/onionCar3.png','/static/images/common/onionCar4.png','/static/images/common/onionCar5.png']




}
</script>

<style lang="less" scoped>
  .page.knowOnionCar{
    .backgroundColor{
      background-color: #fafafa
    }
  }
</style>

