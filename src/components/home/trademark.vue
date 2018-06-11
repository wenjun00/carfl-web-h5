<template >
  <section class="component trademark">
    <!-- <img v-for="(item,index) of trademarkList" @click="Allcar(index)" :key="index" :src="item.img" height="60px" /> -->

    <div class="logo" v-for="(item,index) in trademarkList" :key="index">
      <div @click="Allcar(index,item.id)">
        <img height="40px" :src="item.logoUrl" alt="">
        <div class="logoDetails">{{item.brandName}}</div>
      </div>
    </div>

  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { carShowManagementService } from "~/services/manage-service/car-show-management.service";
@Component({})
export default class Trademark extends Vue {
  @Dependencies(carShowManagementService) private carShowManagementService: carShowManagementService;
  private trademarks = []
  get trademarkList() {
    let list = this.trademarks.slice(0, 9)
    list.push({
      logoUrl: "/static/images/home/trademarks/all.png",
      brandName: "全部新车"
    })
    return list

  }
  /**
   * 点击当前品牌 进入相对应的品牌车辆
   */
  Allcar(index, id) {
    let brandId = index < 9 ? id : -1
    this.$router.push(`/buy-car-list/${brandId}`)
  }

  fristVehicleBrand() {
    this.carShowManagementService.getTopTenCarBrandList().subscribe(
      data => {
        this.trademarks = data

      },
      err => this.$toast(err.msg)
    )
  }
  mounted() {
    this.fristVehicleBrand()
  }






}

</script>

<style lang="less" scoped>
.component.trademark {
  .logo {
    width: 20%;
    float: left;
    .logoDetails {
      font-size: 12px;
    }
  }
}
</style>


