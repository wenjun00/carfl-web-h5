<template >
  <section class="page subscribe">
    <p class="title">输入车辆信息</p>
    <van-cell-group>
      <van-field v-model="model.car" required readonly icon="arrow" placeholder="请选择车辆" @click="carClick"/>
      <van-field v-model="model.address" required readonly icon="arrow" placeholder="请选择所在地" @click="getCity"/>
      <van-field v-model="model.regDate" required readonly icon="arrow" placeholder="首次上牌时间"  @click="boardDate"/>
      <van-field v-model="model.mile" center required placeholder="请输入行驶公里">
        <p slot="button" size="small" text >万公里</p>
      </van-field>
    </van-cell-group>
    <van-button type="primary" class="nextStepSty" bottom-action @click="addAffirm">获取估价</van-button>
    <van-datetime-picker v-show="validPeriod" v-model="currentDate" type="year-month" :min-date="minDate" :max-date="maxDate" @cancel="validPeriodCancel" @confirm="validPeriodAffirm" />
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
export default class Subscribe extends Vue {
  @Dependencies(VehicleRoughService) private vehicleRoughService: VehicleRoughService;
  @State carProduct
  @State carCity
  @Mutation updateInformation
  @Mutation updateSubmit
  private model:any = {
    car:'',
    address:'',
    regDate:'',
    mile:''
  }
  private validPeriod: boolean = false
  private currentDate: any = new Date()
  private minDate: any = new Date()
  private maxDate:any = new Date()
  mounted() {
    if(this.carProduct){
     this.model.car = this.carProduct.modelName
    }
    if(this.carCity){
      this.model.address = this.carCity.cityName
    }
  }
  private addAffirm(){
    if(!this.carProduct.modelId){
      this.$toast("请选择车辆")
      return
    }
    if(!this.carCity.cityId){
      this.$toast("请选择所在地")
      return
    }
    if(!this.model.regDate){
      this.$toast("请选择首次上牌时间")
      return
    }
    if(!this.model.mile){
      this.$toast("请输入行驶公里")
      return
    }
    let modelDate:any ={
      modelId:this.carProduct.modelId,
      zone:this.carCity.cityId,
      regDate:this.model.regDate,
      mile:this.model.mile
    }
    this.vehicleRoughService.roughChe300Price(modelDate)
      .subscribe((data)=>{
        this.updateSubmit({regDate:modelDate.regDate,mile:modelDate.mile})
        this.updateInformation({lowPrice:data.lowPrice,highPrice:data.highPrice,goodPrice:data.goodPrice,price:data.price,})
      },({msg}) =>{})
    this.$router.push('/hot-loading')
  }
  private carClick(){
    this.$router.push('/buy-car-list')
  }
  private getCity(){
    this.$router.push('/support-bank')
  }
  private boardDate(){
    let mounth:any = new Date()
    if(!this.model.car){
      this.$toast.fail("请先选择车辆")
      return
    }
    this.vehicleRoughService.queryRegList(this.carProduct.modelId)
      .subscribe((data)=>{
        this.validPeriod = true
        this.minDate = new Date(Number(data.minRegYear), 0, 1)
        this.maxDate = new Date(Number(data.maxRegYear), mounth.getMonth(), 1)
        this.currentDate = this.minDate
      },({msg}) =>{
        this.$toast.fail(msg)
      })
  }
  private validPeriodAffirm(val) {
    this.model.regDate = this.$filter.dateFormat(val, "yyyy-MM")
    this.validPeriod = false
  }
  private validPeriodCancel() {
    this.validPeriod = false
  }
}
</script>
<style lang="less">
.page.subscribe {
  .title {
    color: #3799E3;
    font-size: 18px;
    margin-left: 15px;
    margin-top:20px;
  }
  .nextStepSty {
    margin-top: 40px;
    color: white!important;
    background: #3799E3!important;
  }
}
</style>


