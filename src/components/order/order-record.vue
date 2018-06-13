<template>
  <section class="component order-record">
    <van-cell-group>
      <van-cell v-for="(item,index) of this.dataSet" :key="index" :title="$dict.getDictName(item.orderLink)" :label="item.operateTime | dateFormat" />
    </van-cell-group>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { Getter, State } from "vuex-class";
@Component({})
export default class OrderRecord extends Vue {
  @State orderInfo
  private dataSet: any = []

  // @Prop() orderId: number;
  // @Watch('orderId', { immediate: true })
  // onOrderIdChange() {
  //   // TODO  重新获取合同列表
  //   this.dataSet = []
  //   let index = 0
  //   while (index < 4) {
  //     this.dataSet.push(this.createTmpRecord())
  //     index++
  //   }
  // }

  // private createTmpRecord() {
  //   return {
  //     id: 1,
  //     title: "订单签署",
  //     date: new Date()
  //   }
  // }
  orderRecordfun(val){
    this.dataSet = val
  }


  mounted(){
    // this.dataSet = this.orderInfo
    // console.log(this.dataSet,'ccaozuo')
  }

}
</script>

<style lang="less" scoped>
.order-record {
}
</style>

