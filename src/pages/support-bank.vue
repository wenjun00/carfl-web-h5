<template>
  <section class="page support-bank">
    <van-row class="bankHeand">
      <van-col span="24">银行列表</van-col>
    </van-row>
    <div class="nullString"></div>
    <van-row class="conentRow" v-for="(item,index) in bankList" :key="index">
      <van-col v-for="(itemTwo,indexTwo) in item" :key="indexTwo">{{itemTwo.bankName}}</van-col>
    </van-row>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ProductOrderService } from "~/services/manage-service/product-order.service";
import { Dependencies } from "~/core/decorator";
@Component({
  components: {}
})
export default class supportBank extends Vue {
  @Dependencies(ProductOrderService) private productOrderService: ProductOrderService;
  bankList: any = []

  /***
   * 获取支持银行
   */
  getOredrMessage() {
    this.productOrderService.getBankCodeList().subscribe(
      data => {
        let arr = []
        for (let i = 0, len = data.length; i < len; i += 3) {
          arr.push(data.slice(i, i + 3));
        }
        this.bankList = arr
        console.log(arr)
      },
      err => this.$toast(err.msg)
    )
  }
  mounted() {
    this.getOredrMessage()
  }


}
</script>

<style lang="less">
.page.support-bank {
  .conentRow {
    font-size: 14px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    width: 100%;
    border-bottom: 2px solid gray;
    height: 30px;
    line-height: 30px;
    padding: 5px;
  }
  .bankHeand {
    text-align: center;
    font-weight: 600;
  }
  .nullString {
    margin: 10px 0px;
    height: 10px;
    background: #eeeeee;
  }
  .bankMargin {
    margin: 10px;
  }
}
</style>
