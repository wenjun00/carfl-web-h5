<template>
  <section class="component order-contract">
    <van-cell-group>
      <van-cell v-for="(item,index) of this.dataSet" :key="index" :title="`《${item.title}》`" :value="item.state ? '已签约':'未签约'" is-link  @click="onitemClick(item)"/>
    </van-cell-group>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

@Component({})
export default class OrderContract extends Vue {

  private dataSet: any = []

  @Prop() orderId: number;
  @Watch('orderId', { immediate: true })
  onOrderIdChange() {
    // TODO  重新获取合同列表
    this.dataSet = []
    let index = 0
    while (index < 4) {
      this.dataSet.push(this.createTmpContrace())
      index++
    }
  }

  private createTmpContrace() {
    return {
      id: 1,
      title: "租赁合同",
      state: false,
      content: "balabala租赁合同balabala租赁合同balabala租赁合同balabala租赁合同" +
        "balabala租赁合同balabala租赁合同balabala租赁合同balabala租赁合同" +
        "balabala租赁合同balabala租赁合同balabala租赁合同balabala租赁合同" +
        "balabala租赁合同balabala租赁合同balabala租赁合同balabala租赁合同" +
        "balabala租赁合同balabala租赁合同balabala租赁合同balabala租赁合同" +
        "balabala租赁合同balabala租赁合同balabala租赁合同balabala租赁合同" +
        "balabala租赁合同balabala租赁合同balabala租赁合同balabala租赁合同"
    }
  }

  private onitemClick(item){
    this.$dialog.alert({
      title: item.title,
      message: item.content
    })
  }


}
</script>

<style lang="less" scoped>
.order-contract {
}
</style>

