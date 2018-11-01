<template>
  <section class="page my-order">
    <div style="width:100%;heght:400px;padding:10px;font-size:14px">
      <div><p>{{carSeries}}</p></div>
      <div style="font-size:12px;color:rgb(125,125,125);display:flex;justify-content: space-between;">
        <span>{{cityName}}</span> |
        <span style="display: inline-block;margin-top: 1px">{{timeDate}}</span> |
        <span>{{mail}}万公里</span> |
        <span>指导价{{price}}万元</span>
      </div>
      <div style="width:100%;margin-top:20px">
        <div style="width:100%;height:150px;position:relative">
          <img src="/static/images/common/index3.png" style="width:100%;height:100%"/>
          <p style="position:absolute;top:-10px;right:30px;z-index:999;font-size:26px;color:white">车况优秀</p>
          <p style="position:absolute;top:45px;right:30px;z-index:999;font-size:12px;color:white">无任何事故，全程4S店保养</p>
          <p style="position:absolute;top:80px;right:30px;z-index:999;color:white"><span style="font-size:24px">{{highPrice}}</span><span style="display:inline-block;margin-left:12px">万元左右</span></p>
        </div>
      </div>
      <div style="width:100%;margin-top:10px">
        <div style="width:100%;height:150px;position:relative">
          <img src="/static/images/common/index1.png" style="width:100%;height:100%"/>
          <p style="position:absolute;top:-10px;right:30px;z-index:999;font-size:26px;color:white">车况良好</p>
          <p style="position:absolute;top:45px;right:30px;z-index:999;font-size:12px;color:white">有过轻微刮蹭，定期修理店保养</p>
          <p style="position:absolute;top:80px;right:30px;z-index:999;color:white"><span style="font-size:24px">{{goodPrice}}</span><span style="display:inline-block;margin-left:12px">万元左右</span></p>
        </div>
      </div>
      <div style="width:100%;margin-top:10px">
        <div style="width:100%;height:150px;position:relative">
          <img src="/static/images/common/index2.png" style="width:100%;height:100%"/>
          <p style="position:absolute;top:-10px;right:30px;z-index:999;font-size:26px;color:white">车况一般</p>
          <p style="position:absolute;top:45px;right:30px;z-index:999;font-size:12px;color:white">有过较大事故，出保额在5000元以上</p>
          <p style="position:absolute;top:80px;right:30px;z-index:999;color:white"><span style="font-size:24px">{{lowPrice}}</span><span style="display:inline-block;margin-left:12px">万元左右</span></p>
        </div>
      </div>
      <div style="display:flex;justify-content: center">
        <p style="font-size:14px"><b style="color:orange">营运车辆</b>，具体车况不同，对价格会有较大影响哦</p>
      </div>
    </div>

  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Mutation, Action, Getter } from "vuex-class";
@Component({
  components: {
  }
})
export default class MyOrder extends Vue {
  @State carInformation
  @State carProduct
  @State carCity
  @State carSubmit
  private carSeries:any = ''
  private cityName:any =''
  private timeDate:any =''
  private mail:any = ''
  private lowPrice:any = ''
  private highPrice:any = ''
  private goodPrice:any = ''
  private price:any = ''
  mounted() {
    this.carSeries = this.carProduct.modelName
    this.cityName = this.carCity.cityName
    this.timeDate = this.carSubmit.regDate
    this.mail = this.carSubmit.mile
    this.lowPrice = this.carInformation.lowPrice
    this.highPrice = this.carInformation.highPrice
    this.goodPrice = this.carInformation.goodPrice
    this.price = this.carInformation.price
  }
}
</script>

<style lang="less" scoped>
.page.my-order {
  padding:0px 17px 5px 5px;
}
</style>

