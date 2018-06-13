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
@Component({})
export default class OrderContract extends Vue {
  @Dependencies(ContractDetailsControllerService) private contractDetailsControllerService: ContractDetailsControllerService;

  private dataCompact: any = []
  // private dataSet: any = []
  // @Prop() orderId: number;
  // @Watch('orderId', { immediate: true })
  // onOrderIdChange() {
  //   // TODO  重新获取合同列表
  //   this.dataSet = []
  //   let index = 0
  //   while (index < 4) {
  //     this.dataSet.push(this.createTmpContrace())
  //     index++
  //   }
  // }

  // private createTmpContrace() {
  //   return {
  //     id: 1,
  //     title: "租赁合同",
  //     state: false,
  //     content: "balabala租赁合同balabala租赁合同balabala租赁合同balabala租赁合同" +
  //       "balabala租赁合同balabala租赁合同balabala租赁合同balabala租赁合同" +
  //       "balabala租赁合同balabala租赁合同balabala租赁合同balabala租赁合同" +
  //       "balabala租赁合同balabala租赁合同balabala租赁合同balabala租赁合同" +
  //       "balabala租赁合同balabala租赁合同balabala租赁合同balabala租赁合同" +
  //       "balabala租赁合同balabala租赁合同balabala租赁合同balabala租赁合同" +
  //       "balabala租赁合同balabala租赁合同balabala租赁合同balabala租赁合同"
  //   }
  // }

  private onitemClick(item, code) {

    if (code == 1000) {
      ImagePreview([
        item
      ], 1);
    } else {
      this.$toast('当前合同暂未生成')
    }

  }

  getContractDetails() {
    this.contractDetailsControllerService.getContractDetailsListByOrderId(156).subscribe(
      data => {
        this.dataCompact = data

        // console.log(this.dataCompact, '789789789')
      },
      err => this.$toast(err.msg)
    )
  }

  mounted() {
    this.getContractDetails()
  }

}
</script>

<style lang="less" scoped>
.order-contract {
}
</style>

