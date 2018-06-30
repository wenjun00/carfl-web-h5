<template>
  <section class="component order-contract">
    <van-cell-group>
      <van-cell v-for="(item,index) of this.dataCompact" :key="index" :title="`《${item.contractName}》`" :value="$dict.getDictName(item.signContract)" is-link @click="onitemClick(item.viewpdfUrl,item.code)" />
    </van-cell-group>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { ContractDetailsControllerService } from "~/services/manage-service/contract-details-controller.service";
import { Dependencies } from "~/core/decorator";
import { ImagePreview } from 'vant';
import { Getter, State } from "vuex-class";
import { setTimeout } from "core-js";
@Component({})
export default class OrderContract extends Vue {
  @Dependencies(ContractDetailsControllerService) private contractDetailsControllerService: ContractDetailsControllerService;
  @State getOrderId

  private dataCompact: any = []
  private onitemClick(item, code) {

    if (code == 1000) {
      ImagePreview([
        item
      ], 1);
    } else {
      this.$toast('当前合同暂未生成')
    }
  }
 // 合同id
  getContractDetails() {
    this.contractDetailsControllerService.getOrderContractListByOrderId(this.getOrderId).subscribe(
      data => {
        this.dataCompact = data
      },
      err => this.$toast(err.msg)
    )
  }

  mounted() {
    if(this.getOrderId){
      this.getContractDetails() 
    }
     
      
  }

}
</script>

<style lang="less" scoped>
.order-contract {
}
</style>

