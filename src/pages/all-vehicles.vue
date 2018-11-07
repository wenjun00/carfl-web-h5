<template>
  <section class="page all-vehicles">
    <p class="title">选择车辆系列</p>
    <ul class="brandContent" v-for="(itemTwo,index) in carSeries" :key="index">
      <li @click="carService(itemTwo.id,itemTwo.seriesName)">
        <span> {{itemTwo.seriesName}}</span>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { VehicleRoughService } from "~/services/manage-service/vehicle-rough.service";
import { State, Mutation, Action, Getter } from "vuex-class";
@Component({
  components: {}
})
export default class allVehicles extends Vue {
  @Dependencies(VehicleRoughService) private vehicleRoughService: VehicleRoughService;
  @Mutation updateSeries;
  private brandId:any = ''
  private brandName:any =''
  private carSeries = []
  private carService(seriesId,seriesName){
    this.updateSeries({seriesId:seriesId,seriesName:seriesName})
    this.$router.push({ path: '/add-information/', query: { seriesId: seriesId, seriesName: seriesName } })
  }
  mounted() {
    this.brandId = this.$route.query.brandId
    this.brandName = this.$route.query.brandName
    this.vehicleRoughService.getAllSeriesByBrandId(this.brandId)
      .subscribe((data)=>{
        this.carSeries =data
      },({msg}) =>{
        this.$toast.fail(msg)
      })
  }
}
</script>

<style lang="less" scoped>
.page.all-vehicles {
  .title {
    color: #3799E3;
    font-size: 18px;
    margin-left: 15px;
    margin-top:20px;
  }
  .brandContent {
    padding-left: 20px !important;
    font-size: 14px !important;
    line-height: 35px !important;
  }
}
</style>


