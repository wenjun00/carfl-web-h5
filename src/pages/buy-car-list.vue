<template >
  <section class="page buy-car-list">
    <!-- 车牌 -->
    <p class="title">选择车辆品牌</p>
    <div v-for="(item,index) in carBrand" :key="index">
      <div class="brandHeand" :class=item.titleCase>{{item.titleCase}}</div>
      <ul class="brandContent" v-for="(itemTwo,index) in item.data" :key="index">
        <li @click="carService(itemTwo.id,itemTwo.brandName)">
          <span> {{itemTwo.brandName}}</span>
        </li>
      </ul>
    </div>
   <!-- 左侧字母 -->
    <div class="left-side-fixed">
      <ul v-for="(item,index) in carBrandTwo" :key="index">
        <li @click="onClickBrand(item)" style="display:inline-block;margin-top:5px">{{item}}</li>
      </ul>
    </div>
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
export default class BuyCarList extends Vue {
  @Dependencies(VehicleRoughService) private vehicleRoughService: VehicleRoughService;
  @Mutation updateCarbrand;
  private carBrand:Array<any> = []
  private carBrandTwo = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
  private mounted(){
    this.vehicleRoughService.getAllCarBrand()
      .subscribe((data)=>{
        let pageCode:Array<any> = []
        let map:any = {}
        for(let i=0;i<data.length;i++){
          if(!map[data[i].titleCase]){
            pageCode.push({
              titleCase:data[i].titleCase,
              data: [data[i]]
            })
            map[data[i].titleCase] = data[i]
          }else{
            for(let j=0;j<pageCode.length;j++){
              if(pageCode[j].titleCase == data[i].titleCase){
                pageCode[j].data.push(data[i]);
                break;
              }
            }
          }
        }
        this.carBrand = pageCode
      },({msg}) =>{
        this.$toast.fail(msg)
      })
  }
  private onClickBrand(item){
    let scroll:any =  document.querySelector(`.${item}`)
    if(scroll !== null){
      scroll.scrollIntoView({block:'start',behavior:'smooth'})
    }
  }
  private carService(brandId,brandName){
    this.updateCarbrand({brandId:brandId,brandName:brandName})
    this.$router.push({ path: '/all-vehicles/', query: { brandId: brandId, brandName: brandName } })
  }
}
</script>

<style lang="less" scoped>
  .page.buy-car-list{
    .title {
      color: #3799E3;
      font-size: 18px;
      margin-left: 15px;
      margin-top:20px;
    }
    .brandHeand {
      padding-left: 10px;
      background: #f1f1f1;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
    }
    .left-side-fixed {
      cursor: pointer;
      width: 50px;
      text-align: right;
      position: fixed;
      top: 10%;
      right: 10px;
      font-size: 12px;
      color: rgb(153, 153, 153)
    }
    .brandContent {
      padding-left: 20px !important;
      font-size: 12px !important;
      line-height: 35px !important;
    }
    .siftCar {
      position: relative;
      top: 5px;
    }
  }
</style>


