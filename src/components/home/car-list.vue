<template >
  <section class="component car-list">
    <van-row>
      <van-col span="12" class="car-list-item" v-for="(item,index) of carIntro" :key="index">
        <div class="car-list-img" @click="carInfoClick(item.carId) ">
          <img :src="item.carPictures.length > 0 ?item.carPictures[0].url:null" :alt="item.modelName" height="100%">
        </div>
        <div class="car">
          <p class="beyondLittle">{{item.brandSeriesName}}</p>
          <p class="car-info">{{item.modelName}}</p>
        </div>
        <div class="car">
          <span class="car-first">首付{{item.firstPayment/10000| toThousands}}万</span>
          <span class="car-month">月供{{item.monthRent |toThousands}}元</span>
        </div>
        <!-- <van-row>
          <van-col span="12" class="car-first">首付{{item.firstPayment/10000| toThousands}}万</van-col>
          <van-col span="12" class="car-month">月供{{item.monthRent |toThousands}}元</van-col>
        </van-row> -->
      </van-col>
    </van-row>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";
import { LodashService } from "~/utils/lodash.service";
import { carShowManagementService } from "~/services/manage-service/car-show-management.service";
import { Dependencies } from "~/core/decorator";

@Component({})
export default class CarList extends Vue {
  @Dependencies(carShowManagementService) private carShowManagementService: carShowManagementService;

  private carIntro = []
  private dataSet = []
  /**
   * 获取精品车辆
   */
  getBoutiqueCar() {
    this.carShowManagementService.getGoodCarShowModelList().subscribe(
      data => {
        this.carIntro = data
      },
      err => this.$toast(err.msg)
    )
  }
  /**
   * 点击车辆跳转
   */
  carInfoClick(id) {
    this.$router.push(`/details/${id}`)

  }

  mounted() {
    this.getBoutiqueCar()
  }
}
</script>

<style lang="less" scoped>
.component.car-list {
  .car-list-img {
    height: 120px;
    max-height: 120px;
    overflow: hidden;
  }
  .car {
    text-align: left;
    &-list-item {
      width: 50%;
      border: 1px solid rgba(0, 0, 0, 0);
      padding-left: 5px;
      padding-right: 5px;
      height: 230px;
    }
    &-info {
      font-size: 0.8rem;
      color: gray;
      margin-left: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &-first {
      font-size: 0.7rem;
      color: #ffdb00;
      margin-left: 5px;
    }
    &-month {
      font-size: 0.7rem;
      color: gray;
      margin-left: 5px;
    }
    .beyondLittle {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-left: 5px;
    }
  }
}
</style>


