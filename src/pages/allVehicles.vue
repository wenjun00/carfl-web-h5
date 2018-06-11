<template>
  <section class="page allVehicles">

    <div class="logo" v-for="(item,index) in trademarks" :key="index">
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
@Component({
  components: {
  }
})
export default class allVehicles extends Vue {
  @Dependencies(carShowManagementService) private carShowManagementService: carShowManagementService;
  private trademarks: any = []

  Allcar(index, id) {
      this.$router.push(`/buy-car-list/${id}`)
    
  }

  fristVehicleBrand() {
    this.carShowManagementService.getAllCarBrandList().subscribe(
      data => {
        // console.log(data)
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
.page.allVehicles {
  .logo {
    width: 20%;
    float: left;
    .logoDetails {
      font-size: 12px;
    }
  }
}
</style>


