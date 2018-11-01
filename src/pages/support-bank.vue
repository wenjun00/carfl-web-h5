<template>
  <section class="page support-bank">
    <div class="brandHeand">热门城市</div>
    <div style="width: 100%">
      <div style=" padding:0px 8px 10px 5px;display: flex;justify-content: flex-start;flex-wrap: wrap;">
        <div class="fixed" v-for="{value,label} in fixedCity" @click="getCity(value,label)">{{label}}</div>
      </div>
    </div>
    <div class="brandHeand">省份</div>
    <van-collapse v-model="activeNames" @change="openCollapse" accordion>
      <van-collapse-item :title="label" v-for="{value,label} in province" :key="value" :name="value">
        <div style="width: 100%">
          <div style="display: flex;justify-content: flex-start;flex-wrap: wrap;">
            <div class="fixed" v-for="{value,label} in city" @click="getCity(value,label)">{{label}}</div>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ProductOrderService } from "~/services/manage-service/product-order.service";
import { Dependencies } from "~/core/decorator";
import { State, Mutation, Action, Getter } from "vuex-class";
@Component({
  components: {}
})
export default class SupportBank extends Vue {
  @Dependencies(ProductOrderService) private productOrderService: ProductOrderService;
  @Mutation updataCity;
  private  activeNames:any =  []
  private province:any =[]
  private city:any = []
  private fixedCity:Array<any> = [{label:"北京",value:3874},{label:"上海",value:2441},{label:"重庆",value:926},{label:"成都",value:2956},
    {label:"天津",value:1756},{label:"南京",value:2179},{label:"深圳",value:3666},{label:"广州",value:3677},{label:"杭州",value:3234},{label:"西安",value:1919}
  ]
  mounted() {
    this.province = this.$city.getCityData({ level : 1 })
  }
  private openCollapse(val){
    this.city = this.$city.getCityData({ level: 1, id: val })
  }
  private getCity(value,label){
    this.updataCity({cityId:value,cityName:label})
    this.$router.push('/Subscribe/')
  }
}
</script>

<style lang="less">
.page.support-bank {
  .fixed {
    display: inline-block;
    line-height: 20px;
    height: 20px;
    width:17%;
    border: 1px solid rgb(201,201,201);
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
    color: rgb(114,110,110);
    margin-left: 8px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .brandHeand {
    padding-left: 10px;
    background: #f1f1f1;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
  }
}
</style>
