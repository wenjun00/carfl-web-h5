<template>
  <section class="page support-bank">
    <van-row class="bankHeand">
      <van-col span="24">银行列表</van-col>
    </van-row>
    <div class="nullString"></div>
     <van-row >
      <van-col class="bankMargin" v-for="(item,index) in bankList" :key="index" >{{item.bankName}}</van-col>
    
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
 bankList:any =[]

  /***
   * 获取支持银行
   */
    getOredrMessage() {
    this.productOrderService.getBankCodeList().subscribe(
      data => {
        this.bankList = data
        console.log(data)
      },
      err => this.$toast(err.msg)
    )
  }
  mounted(){
    this.getOredrMessage()
  }


}
</script>

<style lang="less">
.page.support-bank {
  .bankHeand {
    text-align: center;
    font-weight: 600;
  }
  .nullString {
    margin: 10px 0px;
    height: 10px;
    background: #eeeeee;
  }
  .bankMargin{
    margin: 10px;
  }
}
</style>
