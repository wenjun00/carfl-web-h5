<template>
  <section class="page addInformation">
    <p class="title">选择车辆型号</p>
    <ul class="brandContent" v-for="(itemTwo,index) in carProduct" :key="index">
      <li @click="carService(itemTwo.modelId,itemTwo.modelName)">
        <span> {{itemTwo.modelName}}</span>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { VehicleRoughService } from "~/services/manage-service/vehicle-rough.service";
import { State, Mutation, Action, Getter } from "vuex-class";
@Component({})
export default class AddInformation extends Vue {
  @Dependencies(VehicleRoughService) private vehicleRoughService: VehicleRoughService;
  @Mutation updateProduct
  private seriesId:any = ''
  private seriesName:any =''
  private carProduct:Array<any> = []

  private carService(modelId,modelName){
    this.updateProduct({modelId:modelId,modelName:modelName})
    this.$router.push('/Subscribe')
  }
  private mounted(){
    this.seriesId = this.$route.query.seriesId
    this.seriesName = this.$route.query.seriesName
    this.vehicleRoughService.getAllModelBySeriesId(this.seriesId)
      .subscribe((data)=>{
        this.carProduct =data
      },({msg}) =>{
        this.$toast.fail(msg)
      })
  }

}
</script>
<style lang="less">
.page.addInformation {
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


