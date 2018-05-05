<!--个人意向客户选择车型--> 
<template>
    <section class="component add-vehicle-modal">
        <i-row class="smallPinkie">
            <i-col :span="7">
                <h2 class="brand">品牌</h2>
                <div class="content">
                    <div v-for="item in brand" class="content-one" :class="{'content-click':fatherId===item.id}" @click="clickBrand(item)">
                        <span class="content-two">{{item.brandName }}</span>
                    </div>
                </div>
            </i-col>
            <i-col :span="7">
                <h2 class="brand">车系</h2>
                <div class="content">
                    <div class="content-one" v-for="item in series" :class="{'content-click':SerciseId===item.id}" @click="clickSeries(item)">
                        <span class="content-two">{{item.seriesName }}</span>
                    </div>
                </div>
            </i-col>
            <i-col :span="10">
                <h2 class="brand">车型</h2>
                <div class="content">
                    <div class="content-one" v-for="item in car" :class="{'content-click':CarId===item.id}" @click="clickCar(item)">
                        <span class="content-two">{{item.modelName }}</span>
                    </div>
                </div>
            </i-col>
        </i-row>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Dependencies } from '~/core/decorator'
import { PageService } from '~/utils/page.service'
import { PersonalService } from '~/services/manage-service/personal.service'
import { CarService } from '~/services/manage-service/car.service'
@Component({
  components: {}
})
export default class AddvehicleModal extends Vue {
  @Dependencies(CarService) private carService: CarService
    private carList: any = []
    private brand: any = [] //车辆品牌
    private series: any = [] //车辆系列
    private car: any = [] //车辆型号

    public fatherId = '' //保存的根Id
    public SerciseId = '' //车系Id
    public CarId = ''  //车型Id

    private fatherName = '' //选择的品牌名称
    private SerciseName = '' //选择的车系名称
    private CarName= ''  //选择的车型名称
  /**
   * 获取车辆信息
   */
  carTree() {
    this.carService.findAllCarSeries().subscribe(
      data => {
        this.carList = data
        this.brand = this.carList.filter(v => v.id)
        console.log(this.brand)
      },
      ({ msg }) => {
        this.$Message.error(msg)
      }
    )
  }
   /**
     *  点击车辆品牌
     */
    clickBrand(item){
      console.log(item)  
      this.fatherId =  item.id //保存根Id
      this.fatherName  = item.brandName
      this.series = this.carList.filter(v=>v.id === item.id)[0].series.filter(x=>x.brandId == item.id)
      this.car = []
    }
    /**
     *  点击车辆系列
     */
    clickSeries(item){
      this.SerciseId = item.id
      this.SerciseName  = item.seriesName
      this.car = this.carList.filter(v=>v.id === this.fatherId)[0].series.filter(x=>x.id === item.id)[0].cars.filter(m=>m.seriesId === item.id)
    }
    /**
     *  点击车辆型号
     */
    clickCar(item){
      this.CarId = item.id
      this.CarName  = item.modelName
    }
  mounted() {
    this.carTree()
  }
}
</script>
<style lang="less" scoped>
.component.add-vehicle-modal {
   .smallPinkie{
       cursor: pointer;
   } 
  .box-commend {
    display: flex;
    justify-content: center;
    .box-commend-first {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 1px solid dodgerblue;
      position: relative;
      .box-commend-first-one {
        position: absolute;
        top: 25%;
        left: 45%;
        font-size: 18px;
        color: dodgerblue;
      }
      .box-commend-first-two {
        position: absolute;
        top: 60%;
        left: 20%;
        font-size: 12px;
        color: dodgerblue;
      }
    }
    .box-commend-secend {
      width: 150px;
      height: 1px;
      background-color: gray;
      position: relative;
      margin: 40px 20px 0px;
      .box-commend-secend-one {
        border: 10px solid #000;
        border-left-color: gray;
        width: 10px;
        height: 10px;
        border-right-color: transparent;
        border-top-color: transparent;
        border-bottom-color: transparent;
        position: absolute;
        top: -10px;
        left: 150px;
      }
    }
    .box-commend-therd {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 1px solid gray;
      position: relative;
      .box-commend-therd-one {
        position: absolute;
        top: 25%;
        left: 45%;
        font-size: 18px;
      }
      .box-commend-therd-two {
        position: absolute;
        top: 60%;
        left: 20%;
        font-size: 12px;
      }
    }
  }
  .content {
    height: 300px;
    margin: 20px 10px;
    border: 1px solid #ebebeb;
    overflow: auto;
    .content-one {
      width: 100%;
      height: 35px;
      .content-two {
        line-height: 35px;
        font-size: 14px;
        margin-left: 10px;
      }
    }
  }
  .brand {
    display: inline-block;
    margin-top: 20px;
    margin-left: 40%;
  }
  .content-click {
    background: #8cc5ff;
  }
  .div-box {
    height: 400px;
    .judge-div {
      margin-top: 50px;
      margin-left: 50px;
    }
  }
  .change-color {
    color: dodgerblue;
  }
  .therd-color {
    border: 1px solid dodgerblue !important;
  }
  .secend-color {
    background: dodgerblue !important;
  }
  .secend-one-color {
    border-left-color: dodgerblue !important;
  }
}
</style>
