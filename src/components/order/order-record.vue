
<template> 
  <section class="component order-record">
    <van-cell-group>
      <van-cell v-for="(item,index) of operatingData" :key="index" :title="$dict.getDictName(item.orderLink)" :label="item.operateTime | dateFormat" />
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
  @Prop() operatingData
  private dataSet: any = []


}
</script>

<style lang="less" scoped>
.order-record {
}
</style>

