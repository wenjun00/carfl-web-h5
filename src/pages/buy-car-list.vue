<template >
  <section class="component buy-car-list">
    <form action="/">
      <van-search v-model="keyWord" placeholder="寻找您想要买的爱车" @click-icon="keyWord = ''" show-action @search="onSearch">
        <div slot="action">
          <van-icon class="buy-car-list-nav-bar" v-if="!show.search" name="wap-nav" @click="show.navBar = true" />
          <div class="buy-car-list-nav-bar" v-else @click="onSearch">搜索</div>
        </div>
      </van-search>
    </form>
    <van-list v-model="show.loading" :finished="show.finished" @load="loadMore">
      <van-row class="buy-car-list-item" v-for="(item,index) of dataSet" :key="index">
        <van-col span="10">
          <div>
            <div><img src="/static/images/home/car.png" height="100px"></div>
          </div>
        </van-col>
        <van-col span="14">
          <div class="car">
            <span>{{item.title}}</span>
            <br/>
            <span class="car-info">{{item.info}}</span>
            <p class="car-price">厂商指导价{{item.price}}万</p>
          </div>
          <van-row>
            <van-col span="12" class="car-first">首付{{item.firstMoney | toThousands}}万</van-col>
            <van-col span="12" class="car-month">月供{{item.monthMoney}}元</van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-list>
    <div class="to-top" v-show="show.toTop" @click="scrollTop">
      <van-icon name="upgrade" color="#f2f2f2" />
    </div>
    <nav-bar v-model="show.navBar"></nav-bar>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";
import { LodashService } from "~/utils/lodash.service";
import NavBar from "~/components/common/nav-bar.vue";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    NavBar
  }
})
export default class BuyCarList extends Vue {

  private serachKeyWord: string = ''

  get keyWord() {
    return this.serachKeyWord
  }
  set keyWord(val) {
    this.serachKeyWord = val
    this.show.search = val !== ""
  }

  private scrollTop(val) {
    document.documentElement.scrollTop = 0
  }


  onScrollTopChage() {
    let height = document.documentElement.scrollTop || window.pageYOffset
    this.show.toTop = height > 300
  }

  // 控制各个组件显示flag
  private show = {
    navBar: false,
    search: false,
    loading: false,
    finished: false,
    toTop: false
  }

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
    price: 13.39,
    monthMoney: 3640,
    get title() {
      return this.factory + this.brand + this.seriesName
    },
    get info() {
      return `${this.model} ${this.cc} ${this.speedModel} ${this.character}`
    }
  }

  private dataSet = []


  private onSearch() {

  }

  private loadMore() {

    let loaded = new Promise((resolve, reject) => {
      setTimeout(() => {
        let index = 0
        while (index < 10) {
          this.dataSet.push(this.carIntro)
          index++
        }
        resolve()
      }, 3000);
    })

    loaded.then(() => {
      this.show.loading = false;
      if (this.dataSet.length > 100) {
        this.show.finished = true;
      }
    })

  }

  mounted() {
    this.dataSet = []
    let index = 0
    while (index < 10) {
      this.dataSet.push(this.carIntro)
      index++
    }

    window.addEventListener('scroll', this.onScrollTopChage)
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScrollTopChage)

  }

}
</script>

<style lang="less" scoped>
@paddingNum: 10px;
.buy-car-list {
  &-item {
    padding: @paddingNum;
    border-bottom: solid 1px #f2f2f2;
  }
  &-nav-bar {
    padding-left: @paddingNum;
    padding-right: @paddingNum;
  }
  .to-top {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: gray;
    border-radius: 25px;
    opacity: 0.5;
    font-size: 2rem;
    height: 30px;
    width: 30px;
    position: fixed;
    bottom: @paddingNum*3;
    right: @paddingNum*3;
    z-index: 2001;
  }
}
.car {
  text-align: left;
  &-info {
    font-size: 0.9rem;
  }
  &-price {
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


