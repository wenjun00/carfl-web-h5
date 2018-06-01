<template >
  <section class="component car-list">
    <van-row :gutter="10">
      <van-col span="12" v-for="item of dataSet" :key="item.id">
        <div>
          <div><img src="/static/images/home/car.png" width="180px"></div>
        </div>
        <div class="car">
          <span>{{item.title}}</span>
          <span class="car-info">{{item.info}}</span>
          <span></span>
        </div>
        <van-row>
          <van-col span="12" class="car-first">首付{{item.firstMoney | toThousands}}万</van-col>
          <van-col span="12" class="car-month">月供{{item.monthMoney | toThousands }}元</van-col>
        </van-row>
      </van-col>
    </van-row>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";
import { LodashService } from "~/utils/lodash.service";

@Component({})
export default class CarList extends Vue {

  private carIntro = {
    id: 1,
    factory: "上汽通用",
    brand: "雪佛兰",
    seriesName: "科鲁兹",
    model: "2017款",
    cc: "1.5L",
    speedModel: "自动",
    character: "先锋天窗版",
    firstMoney: 1.30,
    monthMoney: 3640.00,
    get title() {
      return this.factory + this.brand + this.seriesName
    },
    get info() {
      return `${this.model} ${this.cc} ${this.speedModel} ${this.character}`
    }
  }

  private dataSet = []

  mounted() {
    this.dataSet = []
    let index = 0
    while (index < 10) {
      this.dataSet.push(this.carIntro)
      index++
    }
  }
}
</script>

<style lang="less" scoped>
.car {
  text-align: left;
  padding-left: 5px;
  &-info {
    font-size: 0.8rem;
    color: gray;
  }
  &-first {
    font-size: 0.9rem;
    color: goldenrod;
  }
  &-month {
    font-size: 0.8rem;
    color: gray;
  }
}
</style>


