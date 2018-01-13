<!--划扣记录-->
<template>
  <section class="component bank-card-info">
    <div style="width:100%;height:40px;border:1px solid black;line-height:40px;background:#F2F2F2">
      <span style="margin-left:6px;">招商银行</span>
      <div style="float:right">
        <i-button class="blueButton" size="small" style="margin-right:10px;" @click="changeBankCard">更换</i-button>
        <i-button class="blueButton" size="small" style="margin-right:4px;">解绑</i-button>
      </div>
    </div>
    <div style="text-align:center;border-left:1px solid black;border-right:1px solid black;height:100px;">
      <span>5719******0829</span>
      <p>户名：开呗（上海）汽车租赁有限公司陕西分公司</p>
      <p>8888888</p><span>城市：西安</span>
      <p>开户行：招商银行</p>
    </div>
    <div style="border:1px solid black;height:40px;line-height:40px">
      <span style="margin-left:6px;">验证状态：</span><span style="color:green">通过</span>
      <span style="float:right;margin-right:6px;">绑卡日期：2017-12-01</span>
    </div>

    <template>
      <i-modal title="换卡" v-model="changeBankCardModal" width="480">
        <change-card></change-card>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import ChangeCard from "~/components/purchase-manage/change-card.vue"
  @Component({
    components: {
      ChangeCard
    }
  })
  export default class BankCardInfo extends Vue {
    private changeBankCardModal: Boolean = false
    created() {

    }
    changeBankCard() {
      this.changeBankCardModal = true
    }
  }

</script>

<style>


</style>
