<template >
  <section class="component buy-car-list">
    <form action="/">
      <van-search v-model.lazy="keyWord" placeholder="寻找您想要买的爱车" @click-icon="onClearClick" show-action @search="searchCarList">
        <div slot="action">
          <van-icon class="buy-car-list-nav-bar" v-if="!show.search" name="wap-nav" @click="show.navBar = true" />
          <div class="buy-car-list-nav-bar" v-else @click="searchCarList">搜索</div>
        </div>
      </van-search>
    </form>

    <van-row class="buy-car-list-item" v-if="carDataSet.length > 0" v-for="(item,index) of carDataSet" :key="index" @click="$router.push(`/details/${item.carId}`)">
      <van-col span="10">
        <div>
          <img :src="(item.carPictures[0] || {}).url" height="80px">
        </div>
      </van-col>
      <van-col span="14">
        <div class="car">
          <span>{{item.brandSeriesName}}</span>
          <br/>
          <span class="car-info">{{item.modelName}}</span>
        </div>
        <van-row>
          <van-col span="12" class="car-first">首付{{item.firstPayment/1000 | toThousands}}万</van-col>
          <van-col span="12" class="car-month">月供{{item.monthRent | toThousands}}元</van-col>
        </van-row>
      </van-col>
    </van-row>

    <div class="no-cars" v-else>
      <p>新车型即将上架，敬请期待</p>
    </div>

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
import { Prop, Watch } from "vue-property-decorator";
import { carShowManagementService } from "~/services/manage-service/car-show-management.service";
import { Dependencies } from "~/core/decorator";

@Component({
  components: {
    NavBar
  }
})
export default class BuyCarList extends Vue {
  @Dependencies(carShowManagementService) private carShowManagementService: carShowManagementService;
  @Prop({
    default: -1
  }) brandId

  @Prop({
    default: ''
  }) transKeyWord

  private searchModel = {
    brandId: '',
    name: ''
  }

  private carDataSet = []  // 查询到的车辆 

  get keyWord() {
    return this.searchModel.name
  }
  set keyWord(val) {
    this.searchModel.name = val
    this.show.search = val !== ""
  }

  private scrollTop(val) {
    window.scrollTo(0, 0)
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


  private dataSet = []

  /**
   * 点击清空按钮
   */
  private onClearClick() {
    this.keyWord = ''
    this.searchCarList()
  }

  /**
   * 获取当前品牌车辆
   */
  searchCarList() {
    this.carShowManagementService.searchCarList(this.searchModel)
      .subscribe(
        data => {
          this.carDataSet = data
        },
        err => {
          this.$toast(err.msg)
        }
      )
  }


  mounted() {
    this.dataSet = []
    if (this.brandId > 0) this.searchModel.brandId = this.brandId
    if (this.transKeyWord !== '') this.keyWord = this.transKeyWord
    this.searchCarList()
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
  .no-cars {
    font-size: 2rem;
    padding-top: 10%;
    text-align: center;
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
    text-align: right;
  }
}
</style>


